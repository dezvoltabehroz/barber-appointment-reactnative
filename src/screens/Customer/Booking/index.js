import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { Button, BarberServices, CartDetails, BookAppointment, Summary, Payment } from '../../../components';
import StepProgress from 'react-native-step-progress';
import THEME from '../../../assets/styles/theme.style';
import moment from 'moment'
import { connect } from 'react-redux';
import { UserAddresses, BookingServices, Barbers } from '../../../services';
class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
            selectedServices: [],
            services: [],
            location: '',
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
            totalPrice: 0,
            timeInHour: '',
            disabled: true,
            bookingDate: '',
            bookingTime: '',
            latitude: '',
            longitude: '',
            data: null,
            customer_services: []
        }
    }
    componentDidMount = () => {
        const { userdata } = this.props;
        Barbers.getBarberServices(userdata)
            .then((response) => {
                if (response.data.status) {
                    this.setState({ services: response.data.barber_services_list })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        UserAddresses.viewAllAddresses(userdata)
            .then((res) => {
                res.data.addresses.forEach(element => {
                    if (element.is_selected == '1') {
                        this.setState({ location: element.address, latitude: element.latitude, longitude: element.longitude })
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    onPeriviousPageChange = () => {
        if (this.state.currentPosition == 0) {
            this.setState({ currentPosition: this.state.currentPosition });
        } else {
            this.setState({ currentPosition: this.state.currentPosition - 1 });
        }

    }

    onPageChange = (position) => {
        if (position === 3 || position === 4)
            this.setState({ currentPosition: position, disabled: false });
        else this.setState({ currentPosition: position, })
    }

    onNextPageChange = () => {
        const { userdata } = this.props;
        const { totalPrice, totalTime, latitude, longitude, bookingDate, bookingTime, data, timeInHour } = this.state;
        if (this.state.currentPosition == 4) {
            this.setState({ currentPosition: this.state.currentPosition, disabled: false });
        } else {
            if (this.state.currentPosition == 3) {
                console.log(moment(totalTime, 'hh:mm:ss'))
                let userData = {
                    token: userdata.token,
                    id: userdata.id,
                    booking_price: totalPrice,
                    booking_time_duration:timeInHour,
                    customer_lat: latitude,
                    customer_long: longitude,
                    booking_date: moment(bookingDate).format('YYYY-MM-DD'),
                    booking_time: moment(bookingTime, ["h:mm A"]).format('HH:mm'),
                    barber_id: userdata.barber_id,
                    customer_id: userdata.id,
                    customer_services: this.state.customer_services,
                    card_detail: data

                }
                console.log(userData);
                BookingServices.makeCustomerBooking(userData)
                    .then((res) => { console.log(res.data) })
                    .catch((err) => { console.log(err) })


            }
            this.setState({ currentPosition: this.state.currentPosition + 1 }, () => {
                if (this.state.currentPosition === 4) {
                    this.setState({ disabled: false })
                }
                else {
                    this.setState({ disabled: true })
                }
            })
        }
    }

    handleSelectedServices = (data) => {
        this.setState({ selectedServices: data, });
        console.log(this.state.selectedServices);
        let customer_services = []
        this.state.selectedServices.forEach(element => {
            customer_services.push({ service_id: element.id, quantity: element.quantity })
        })
        this.setState({ customer_services })
    }

    handleServices = (services) => {
        let selectedArray = [];
        this.setState({ services: services });
        this.state.services.forEach((element) => {
            if (element.selected) {
                selectedArray.push(element);
            }
        })
        this.setState({ selectedServices: selectedArray, disabled: false })
    }

    handleOnChange = () => {
        this.setState({ currentPosition: 0, disabled: true })
    }

    handleLocation = (location) => {
        if (location != '' && location != null)
            this.setState({ location, disabled: false })
    }

    handleRegion = (region) => {
        this.setState({ region })
    }
    handleOnSubmit = (disabled) => {
        this.setState({ disabled })
    }

    getTimeinHours = () => {
        var h = this.state.totalTime / 60 | 0;
        var m = this.state.totalTime % 60 | 0;
        this.setState({ timeInHour: moment.utc().hours(h).minutes(m).format("hh:mm A") })
    }


    render() {
        const labels = ["Service", "Cart", "Time", "Payment", "Summary"];
        const customStyles = {
            stepIndicatorSize: 25,
            currentStepIndicatorSize: 30,
            separatorStrokeWidth: 2,
            currentStepStrokeWidth: 1,
            stepStrokeCurrentColor: THEME.COLOR_WHITE,
            stepStrokeWidth: 0,
            stepStrokeFinishedColor: THEME.PRIMARY_BACKGROUND_COLOR,
            stepStrokeUnFinishedColor: THEME.PRIMARY_BACKGROUND_COLOR,
            separatorFinishedColor: '#3B3F52',
            separatorUnFinishedColor: '#1E2023',
            stepIndicatorFinishedColor: '#3B3F52',
            stepIndicatorUnFinishedColor: '#1E2023',
            stepIndicatorCurrentColor: THEME.PRIMARY_COLOR,
            stepIndicatorLabelFontSize: 13,
            currentStepIndicatorLabelFontSize: 13,
            stepIndicatorLabelCurrentColor: THEME.COLOR_WHITE,
            stepIndicatorLabelFinishedColor: THEME.COLOR_WHITE,
            stepIndicatorLabelUnFinishedColor: THEME.COLOR_GREY,
            labelColor: THEME.COLOR_GREY,
            labelSize: 13,
            currentStepLabelColor: THEME.COLOR_WHITE
        }

        const { currentPosition, services, selectedServices, totalPrice, disabled, totalTime, timeInHour, bookingDate, bookingTime } = this.state
        const { userdata } = this.props;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <StepProgress
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                        labels={labels}
                    // onPress={this.onPageChange}
                    />
                    {
                        this.state.currentPosition == 0 ?
                            <BarberServices
                                key="services"
                                // customerSelectedServices={services}
                                userdata={userdata}
                                time={(time) => this.setState({ totalTime: time }, () => {
                                    var h = time / 60 | 0;
                                    var m = time % 60 | 0;
                                    this.setState({ timeInHour: moment.utc().hours(h).minutes(m).format("HH:mm") })
                                })}
                                price={(price) => this.setState({ totalPrice: price })}
                                isDisable={(data) => this.setState({ disabled: data == "true" ? true : false })}
                                markedServices={(services) => this.handleServices(services)} />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 1 ?
                            <CartDetails
                                key="cart"
                                price={(price) => this.setState({ totalPrice: price }, () => console.log(price))}
                                time={(time) => this.setState({ totalTime: time }, () => {
                                    console.log(time)
                                    var h = time / 60 | 0;
                                    var m = time % 60 | 0;
                                    this.setState({ timeInHour: moment.utc().hours(h).minutes(m).format("HH:mm") })
                                })}
                                isDisable={(data) => this.setState({ disabled: !data })}
                                addQuantity={(data) => this.handleSelectedServices(data)}
                                services={(selectedServices)}
                            />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 2 ?
                            <BookAppointment
                                key="appointment"
                                time={(totalTime)}
                                userdata={this.props.userdata}
                                bookingTime={(date) => this.setState({ bookingTime: date })}
                                bookingDate={(date) => this.setState({ bookingDate: date })}
                                onBookingPress={(isDisable) => this.setState({ disabled: isDisable == "false" ? false : true })} />
                            :
                            null
                    }

                    {
                        this.state.currentPosition == 3 ?
                            <Payment
                                key="payment"
                                isConfirm={(isDisable, data) => this.setState({ disabled: isDisable == "false" ? false : true, data: data })} />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 4 ?
                            <Summary
                                key="summary"
                                userdata={userdata}
                                bookingTime={bookingTime}
                                totalTime={totalTime}
                                bookingDate={bookingDate}
                                addresslocation={(this.state.location)}
                                // onChangePress={this.handleOnChange}
                                services={(selectedServices)}
                            />
                            :
                            null
                    }
                </View>
                <View style={styles.footerStyle}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    {
                        this.state.currentPosition == 0 ?
                            <View style={{ marginHorizontal: '10%' }}>
                                <Button disabled={disabled} title={this.state.currentPosition == 4 ? 'Done' : 'Confirm'} onPress={this.state.currentPosition == 4 ? () => this.props.onDone() : this.onNextPageChange} />
                            </View> :
                            <View style={styles.row}>
                                <View style={styles.buttonContainer}>
                                    {
                                        currentPosition !== 0 ?
                                            totalPrice != 0 ?
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.coloredTextStyles}>${totalPrice}.00<Text style={styles.textStyles}> Total</Text></Text>
                                                    <Text style={styles.coloredTextStyles}>
                                                        {timeInHour[0] == 0 && timeInHour[1] == 0 ? "" : timeInHour[0] + timeInHour[1]}
                                                        {
                                                            timeInHour[0] == 0 && timeInHour[1] == 0 ?
                                                                null
                                                                :
                                                                <Text style={styles.textStyles}> hr</Text>
                                                        }
                                                        {timeInHour[3] == 0 && timeInHour[4] == 0 ? "" : ` ${timeInHour[3]}${timeInHour[4]}`}
                                                        {
                                                            timeInHour[3] == 0 && timeInHour[4] == 0 ?
                                                                null
                                                                :
                                                                <Text style={styles.textStyles}> mins</Text>
                                                        }
                                                    </Text>
                                                </View>
                                                :
                                                null
                                            : null
                                    }
                                </View>
                                <View style={styles.buttonContainer}>
                                    {
                                        this.state.currentPosition == 6 ?
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity disabled={disabled} onPress={this.onNextPageChange} style={styles.btnContainer}>
                                                    <Text style={styles.btnText}>
                                                        Confirm
                                            </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setState({ change: true })} style={[styles.btnContainer, { marginLeft: '2.5%' }]}>
                                                    <Text style={styles.btnText}>
                                                        Change
                                            </Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <Button disabled={disabled} title={this.state.currentPosition == 4 ? 'Done' : 'Confirm'} onPress={this.state.currentPosition == 4 ? () => this.props.onDone() : this.onNextPageChange} />
                                    }
                                </View>


                            </View>
                    }
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userAddresses || {}
    };
};


export default connect(mapStateToProps)(Booking)