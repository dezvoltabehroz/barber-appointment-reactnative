import React, { Component } from 'react';
import { View, } from 'react-native';
import styles from './style';
import { Button, BarberServices, SearchandMapView } from '../../../components';
import StepProgress from 'react-native-step-progress';
import THEME from '../../../assets/styles/theme.style';
import BarberList from '../BarberList'
export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: 0,
        }
    }

    onPeriviousPageChange = () => {
        if (this.state.currentPosition == 0) {
            this.setState({ currentPosition: this.state.currentPosition });
        } else {
            this.setState({ currentPosition: this.state.currentPosition - 1 });
        }

    }

    onPageChange = () => {
        if (this.state.currentPosition == 4) {
            this.setState({ currentPosition: this.state.currentPosition });
        } else {
            this.setState({ currentPosition: this.state.currentPosition + 1 });
        }
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
            stepStrokeFinishedColor: '#1E2023',
            stepStrokeUnFinishedColor: '#1E2023',
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

        const { currentPosition } = this.state
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <StepProgress
                        customStyles={customStyles}
                        currentPosition={currentPosition}
                        labels={labels}
                    />
                    {
                        this.state.currentPosition == 0 ?
                            <BarberServices />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 1 ?
                            <SearchandMapView />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 2 ?
                            <BarberList />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 3 ?
                            <BarberList />
                            :
                            null
                    }
                    {
                        this.state.currentPosition == 4 ?
                            <BarberList />
                            :
                            null
                    }
                </View>
                <View style={styles.footerStyle}>
                    <View style={styles.lineStyle}></View>
                    <View style={styles.gapHeight}></View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.buttonContainer}>
                            <Button title='Back' onPress={this.onPeriviousPageChange} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Next' onPress={this.onPageChange} />
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}