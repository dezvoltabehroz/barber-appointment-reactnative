import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './style';
import { Button, BarberServices, SearchandMapView, BookAppointment, Summary, Payment } from '../../../components';
import StepProgress from 'react-native-step-progress';
import THEME from '../../../assets/styles/theme.style';
export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
            selectedServices: [],
            location: '',
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
            totalPrice: 0,
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
        const { selectedServices } = this.state;
        this.setState({ selectedServices: data });
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


    render() {
        const labels = ["Service", "Location", "Time", "Summary", "Payment"];
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

        const { currentPosition, selectedServices, totalPrice, disabled, totalTime } = this.state

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
                                customerSelectedServices={(selectedServices)}
                                time={(time) => this.setState({ totalTime: time })}
                                price={(price) => this.setState({ totalPrice: price })}
                                isDisable={(data) => this.setState({ disabled: data == "true" ? true : false })}
                                markedServices={(data) => this.handleSelectedServices(data)} />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 1 ?
                            <SearchandMapView
                                address={(location) => this.handleLocation(location)}
                            />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 2 ?
                            <BookAppointment
                                onBookingPress={(isDisable) => this.setState({ disabled: isDisable == "false" ? false : true })} />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 3 ?
                            <Summary
                                addresslocation={(this.state.location)}
                                onChangePress={this.handleOnChange}
                                services={(this.state.selectedServices)}
                            />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 4 ?
                            <Payment />
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
                                totalPrice != 0 ?
                                    <View style={styles.textContainer}>
                                        <Text style={styles.coloredTextStyles}>${totalPrice}.00<Text style={styles.textStyles}> Total</Text></Text>
                                        <Text style={styles.coloredTextStyles}>{totalTime}<Text style={styles.textStyles}> minutes</Text></Text>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button disabled={disabled} title='Next' onPress={this.onNextPageChange} />
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}