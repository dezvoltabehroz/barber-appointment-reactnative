/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberBookingHistoryScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, replace, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberBookingHistory navigation={(data) =>
                navigate(data.route, {
                    bookingId: data.bookingId,
                    bookingDuration:data.bookingDuration,
                    customerId: data.customerId,
                    barberId: data.barberId,
                    item: data.region,
                    bookingDate: data.bookingDate,
                    bookingTime: data.bookingTime,
                    totalPrice: data.totalPrice,
                    history: false
                })}
                onPressBooking={(bookingId, cancelled, customerId) => navigate('ServiceDetails', { bookingId: bookingId, history: true, cancelled: cancelled, customerId: customerId })} />
        )
    }
}
