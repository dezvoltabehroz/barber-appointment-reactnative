/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { BookingServices } from '../../services';
import { CommonActions } from '@react-navigation/native';

export default class BarberServiceCompleteScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleOnHome = (userData) => {
        const { push, replace, pop, popToTop, canGoBack, dispatch } = this.props.navigation;
        console.log(this.props.navigation)
        const { routes, index } = this.props.navigation.dangerouslyGetState();
        const { state: exploreState } = routes[index];
        console.log(routes, index)
        console.log(exploreState)
        BookingServices.rateAndReviewCustomer(userData)
            .then((res) => {
                if (res.data.status) {
                    replace('BarberBookingHistory')

                    // dispatch(
                    //     CommonActions.goBack({
                    //         index: 2,
                    //         routes: [
                    //             { name: 'BarberBookingHistory' }
                    //         ],
                    //     })
                    // );
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
