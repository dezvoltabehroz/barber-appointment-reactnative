import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
        this.setState({ currentPosition: position });
    }

    onNextPageChange = () => {
        if (this.state.currentPosition == 4) {
            this.setState({ currentPosition: this.state.currentPosition });
        } else {
            this.setState({ currentPosition: this.state.currentPosition + 1 });
        }
    }
    handleSelectedServices = (data) => {
        const { selectedServices } = this.state;
        this.setState({ selectedServices: data });
        var totalPrice = 0;
        for (var i = 0; i < selectedServices.length; i++) {
            totalPrice = (totalPrice + selectedServices[i].serviceCost);
        }
        this.setState({ totalPrice });
    }

    handleOnChange = () => {
        this.setState({ currentPosition: 0 })
    }

    handleLocation = (location) => {
        this.setState({ location })
    }

    handleRegion = (region) => {
        this.setState({ region })
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

        const { currentPosition, selectedServices, totalPrice } = this.state

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
                                selectedService={(selectedServices)}
                                markedServices={(data) => this.handleSelectedServices(data)} />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 1 ?
                            <SearchandMapView
                                address={(location) => this.handleLocation(location)}
                                getRegion={(region) => this.handleRegion(region)} />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 2 ?
                            <BookAppointment />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 3 ?
                            <Summary
                                addresslocation={(this.state.location)}
                                onChangePress={this.handleOnChange}
                                services={(this.state.selectedServices)}
                                region={(this.state.region)} />
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
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Next' onPress={this.onNextPageChange} />
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}