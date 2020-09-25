import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { Button, BarberServices, CartDetails, BookAppointment, Summary, Payment } from '../../../components';
import StepProgress from 'react-native-step-progress';
import THEME from '../../../assets/styles/theme.style';
import moment from 'moment'
export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
            selectedServices: [],
            services: [
                {
                    id: 1,
                    serviceName: 'Hair Styling',
                    serviceCost: 100,
                    serviceEstTime: 30,
                    selected: false,
                    quantity: '',
                    description: 'All haircuts include eyebrows, nose, and ears groomed.'
                },
                {
                    id: 2,
                    serviceName: 'Hair Color',
                    serviceCost: 50,
                    serviceEstTime: 45,
                    selected: false,
                    quantity: '',
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 3,
                    serviceName: 'Shave',
                    serviceCost: 50,
                    serviceEstTime: 30,
                    selected: false,
                    quantity: '',
                    description: 'Includes whole head shaped up and back tapered, eyebrows, nose, ears groomed.'
                },
                {
                    id: 4,
                    serviceName: 'Blow Out',
                    serviceCost: 50,
                    serviceEstTime: 20,
                    selected: false,
                    quantity: '',
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 5,
                    serviceName: 'Hair Styling',
                    serviceCost: 100,
                    serviceEstTime: 60,
                    selected: false,
                    quantity: '',
                    description: 'Includes whole head shaped up and back tapered, eyebrows, nose, ears groomed.'
                },
                {
                    id: 6,
                    serviceName: 'Hair Color',
                    serviceCost: 50,
                    serviceEstTime: 45,
                    selected: false,
                    quantity: '',
                    description: 'Includes Chips or choice of Beverage'
                },
                {
                    id: 7,
                    serviceName: 'Shave',
                    serviceCost: 50,
                    serviceEstTime: 30,
                    selected: false,
                    quantity: '',
                    description: 'Any type of haircut + beard + eyebrows and nose and ears Groomed.'
                },
                {
                    id: 8,
                    serviceName: 'Blow Out',
                    serviceCost: 50,
                    serviceEstTime: 20,
                    selected: false,
                    quantity: '',
                    description: 'Includes Chips or choice of Beverage'
                }
            ],
            location: '',
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
            totalPrice: 0,
            timeInHour: '',
            disabled: true
        }
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
        if (this.state.currentPosition == 4) {
            this.setState({ currentPosition: this.state.currentPosition, disabled: false });
        } else {
            this.setState({ currentPosition: this.state.currentPosition + 1 }, () => {
                if (this.state.currentPosition === 3 || this.state.currentPosition === 4) {
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

        const { currentPosition, services, selectedServices, totalPrice, disabled, totalTime, timeInHour } = this.state

        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <StepProgress
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                        labels={labels}
                        onPress={this.onPageChange}
                    />
                    {
                        this.state.currentPosition == 0 ?
                            <BarberServices
                                key="services"
                                customerSelectedServices={services}
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
                                price={(price) => this.setState({ totalPrice: price })}
                                time={(time) => this.setState({ totalTime: time }, () => {
                                    var h = time / 60 | 0;
                                    var m = time % 60 | 0;
                                    this.setState({ timeInHour: moment.utc().hours(h).minutes(m).format("HH:mm"), })
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
                                onBookingPress={(isDisable) => this.setState({ disabled: isDisable == "false" ? false : true })} />
                            :
                            null
                    }

                    {
                        this.state.currentPosition == 3 ?
                            <Payment key="payment" />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 4 ?
                            <Summary
                                key="summary"
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
                        <View style={/*this.state.currentPosition == 1 ? {} :*/ styles.buttonContainer}>
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

                </View>
            </View>
        );
    }
}