/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberBookingHistoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberBookingHistory onPressBooking={(bookingId,cancelled)=>navigate('ServiceDetails', { bookingId:bookingId,history:true,cancelled:cancelled})} />
        )
    }
}
