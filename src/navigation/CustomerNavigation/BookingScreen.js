/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BookingScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.Booking onDone={() => navigate('Appointments')} />
        )
    }
}
