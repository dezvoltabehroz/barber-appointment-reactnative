import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import styles from './style';
import { Button, BarberServices, CartDetails, BookAppointment, Summary, Payment } from '../../../components';
import StepProgress from 'react-native-step-progress';
import THEME from '../../../assets/styles/theme.style';
import moment from 'moment'
import { connect } from 'react-redux';
import { UserAddresses, BookingServices, Barbers } from '../../../services';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native';
//Stripe Initailaization

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
            cardData: null,
            customer_services: [],
            paymentMethod: "",
            btnBookingLoading: false,
            confirmLoading: false
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

    handlePaypalPayment = () => {
        const { userdata, userDetail } = this.props;
        const { totalPrice, totalTime, latitude, longitude, bookingDate, bookingTime, cardData, timeInHour } = this.state;
        this.setState({ confirmLoading: true })
        let userData = {
            token: userdata.token,
            id: userdata.id,
            full_name: userDetail.full_name,
            booking_price: totalPrice,
            booking_time_duration: timeInHour,
            customer_lat: latitude,
            customer_long: longitude,
            customer_address: this.state.location,
            booking_date: moment(bookingDate).format('YYYY-MM-DD'),
            booking_time: moment(bookingTime, ["h:mm A"]).format('HH:mm'),
            barber_id: userdata.barber_id,
            customer_id: userdata.id,
            customer_services: this.state.customer_services,
            card_detail: cardData,
            is_accepted: moment(bookingDate).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? 0 : 1,
            is_accepted_time: moment(bookingDate).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? null : moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss'),
        }
        BookingServices.makeCustomerBooking(userData)
            .then(async (res) => {
                if (res.data.status)
                    BookingServices.initiatePayment(userData)
                        .then((response) => {
                            if (response.data.status) {
                                let orderDetail = {
                                    ...userData,
                                    order_id: response.data.payment.id,
                                    booking_id: res.data.booking_id
                                }
                                BookingServices.savePaymentData(orderDetail)
                                    .then(async (responseData) => {
                                        if (responseData.data.status) {
                                            await Linking.openURL(`${response.data.payment.links[1].href}`)
                                            this.setState({ confirmLoading: false })
                                            this.setState({ currentPosition: this.state.currentPosition + 1 }, () => {
                                                if (this.state.currentPosition === 4) {
                                                    this.setState({ disabled: false, btnBooking: false })
                                                } else { this.setState({ disabled: true }) }
                                            })
                                        }
                                    })
                            }
                        })
                        .catch((err => { console.log(err) }))
            })
    }

    onNextPageChange = () => {
        const { userdata, userDetail } = this.props;
        const { totalPrice, totalTime, latitude, longitude, bookingDate, bookingTime, cardData, timeInHour } = this.state;
        if (this.state.currentPosition == 4) {
            this.setState({ currentPosition: this.state.currentPosition, disabled: false });
        } else {

            if (this.state.currentPosition == 3) {
                if (this.state.paymentMethod == "Paypal") {
                    this.handlePaypalPayment()
                }
                else {
                    if (cardData.card_number != "" && cardData.card_holder != "" && cardData.exp_date != "" && cardData.ccv_code != "") {
                        this.setState({ confirmLoading: true })
                        let userData = {
                            token: userdata.token,
                            id: userdata.id,
                            full_name: userDetail.full_name,
                            booking_price: totalPrice,
                            booking_time_duration: timeInHour,
                            customer_lat: latitude,
                            customer_long: longitude,
                            customer_address: this.state.location,
                            booking_date: moment(bookingDate).format('YYYY-MM-DD'),
                            booking_time: moment(bookingTime, ["h:mm A"]).format('HH:mm'),
                            barber_id: userdata.barber_id,
                            customer_id: userdata.id,
                            customer_services: this.state.customer_services,
                            card_detail: cardData,
                            is_accepted: moment(bookingDate).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? 0 : 1,
                            is_accepted_time: moment(bookingDate).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? null : moment().format('YYYY-MM-DD') + ' ' + moment().format('HH:mm:ss'),
                        }
                        BookingServices.makeCustomerBooking(userData)
                            .then(async (res) => {
                               if (this.state.paymentMethod == "Stripe") {
                                    BookingServices.verifyPaymentCard(userData)
                                        .then((resData) => {
                                            if (resData.data.status) {
                                                let userDetail = {
                                                    ...userData,
                                                    token_id: resData.data.token_data.id,
                                                    booking_id: res.data.booking_id
                                                }
                                                BookingServices.initiateStripePayment(userDetail)
                                                    .then((responseData) => {
                                                        let paymentDetails = {
                                                            ...userDetail,
                                                            client_ip: resData.data.token_data.client_ip,
                                                            card_id: resData.data.token_data.card.id,
                                                            charge_id: responseData.data.charge.id,
                                                            balance_transaction: responseData.data.charge.balance_transaction,
                                                            payment_method: responseData.data.charge.payment_method,
                                                            receipt_url: responseData.data.charge.receipt_url,
                                                        }
                                                        if (responseData.data.status) {
                                                            BookingServices.saveStripePaymentData(paymentDetails)
                                                                .then((savedData) => {
                                                                    if (savedData.data.status) {
                                                                        this.setState({ confirmLoading: false })
                                                                        this.setState({ currentPosition: this.state.currentPosition + 1 }, () => {
                                                                            if (this.state.currentPosition === 4) {
                                                                                this.setState({ disabled: false, btnBooking: false })
                                                                            } else { this.setState({ disabled: true }) }
                                                                        })
                                                                    }
                                                                })
                                                                .catch((err) => console.log(err))
                                                        }
                                                    }).catch((err) => {
                                                        this.setState({ confirmLoading: false })
                                                        alert(err.message)
                                                        console.log(err)
                                                    })
                                            }
                                        })
                                        .catch((err => {
                                            this.setState({ confirmLoading: false })
                                            alert(err.message)
                                            console.log(err)
                                        }))
                                }
                            })
                            .catch((err) => {
                                this.setState({ confirmLoading: false })
                                alert(err.message)
                                console.log(err)
                            })
                    }
                    else {
                        alert('Please fill all the fields')
                    }
                }
            }
            else {
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
    }

    handleSelectedServices = (data) => {
        this.setState({ selectedServices: data, });
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
            separatorStrokeWidth: 0,
            currentStepStrokeWidth: 0,
            stepStrokeCurrentColor: THEME.COLOR_WHITE,
            stepStrokeWidth: 0,
            stepStrokeFinishedColor: THEME.PRIMARY_BACKGROUND_COLOR,
            stepStrokeUnFinishedColor: THEME.PRIMARY_BACKGROUND_COLOR,
            separatorFinishedColor: '#171717',
            separatorUnFinishedColor: THEME.COLOR_GREY,
            stepIndicatorFinishedColor: THEME.COLOR_GREY,
            stepIndicatorUnFinishedColor: THEME.COLOR_GREY,
            stepIndicatorCurrentColor: THEME.PRIMARY_COLOR,
            stepIndicatorLabelFontSize: 13,
            currentStepIndicatorLabelFontSize: 13,
            stepIndicatorLabelCurrentColor: "#171717",
            stepIndicatorLabelFinishedColor: "#171717",
            stepIndicatorLabelUnFinishedColor: "#171717",
            labelColor: THEME.COLOR_GREY,
            labelSize: 13,
            currentStepLabelColor: "#171717"
        }

        const { currentPosition, services, btnBookingLoading, selectedServices, totalPrice, disabled, totalTime, timeInHour, bookingDate, bookingTime } = this.state
        const { userdata } = this.props;
        console.log("totalTime:", totalTime)
        return (
            <>
                <View style={styles.container}>
                    <View style={{ flex: 1 }}>
                        <StepProgress
                            customStyles={customStyles}
                            currentPosition={currentPosition}
                        // labels={labels}
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
                                    totalPrice={totalPrice}
                                    totalTime={totalTime}
                                    price={(price) => this.setState({ totalPrice: price }, () => console.log(price))}
                                    time={(time) => this.setState({ totalTime: time }, () => {
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
                                    paymentMethod={(paymentMethod) => this.setState({ paymentMethod })}
                                    isConfirm={(isDisable, data) => this.setState({ disabled: isDisable == "false" ? false : true, cardData: data })} />
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
                        <View style={{ marginHorizontal: '10%' }}>
                            <Button disabled={disabled} loading={btnBookingLoading} title={this.state.currentPosition == 4 ? 'Done' : this.state.currentPosition == 1 ? "Next" : 'Confirm'} onPress={this.state.currentPosition == 4 ? () => this.props.onDone() : this.onNextPageChange} />
                        </View>
                    </View>
                </View>
                <Modal isVisible={this.state.confirmLoading}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator size={"large"} color={THEME.PRIMARY_COLOR} />
                    </View>
                </Modal>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userAddresses || {},
        userDetail: state.authReducer.userData || {}
    };
};


export default connect(mapStateToProps)(Booking)