/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BookingScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        const { userdata } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.Booking userdata={userdata} onDone={() => navigate('Appointments')} />
        )
    }
}
