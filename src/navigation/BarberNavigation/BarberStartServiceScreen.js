/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class BarberStartServiceScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleStartService = () => {
        const { navigate, goBack } = this.props.navigation
        Alert.alert('Attention', 'Are you sure you want to start service',
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => navigate('BarberEndService', { start: true }) }
            ],
        );


    }

    render() {
        const { navigate, goBack } = this.props.navigation
        const {  bookingId  } = this.props.route.params
        return (
            <MainScreenPaths.Barber.BarberStartService bookingId={bookingId} onStartService={ this.handleStartService} />
        )
    }
}
