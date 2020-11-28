/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { BookingServices } from '../../services';

export default class BarberServiceCompleteScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleOnHome = (userData) => {
        const { push, replace } = this.props.navigation;
        BookingServices.rateAndReviewCustomer(userData)
            .then((res) => {
                if (res.data.status) {
                    replace('Home')
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { customerId, totalPrice, bookingId } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberServiceComplete customerId={customerId} bookingId={bookingId} totalPrice={totalPrice} onHome={(userData) => this.handleOnHome(userData)} />
        )
    }
}
