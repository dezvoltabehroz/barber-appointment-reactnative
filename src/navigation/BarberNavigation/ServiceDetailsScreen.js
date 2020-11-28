/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class ServiceDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate } = this.props.navigation;
        const { bookingId, customerId, history, cancelled, notification } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.ServiceDetails
                cancelled={cancelled}
                history={history}
                notification={notification ? notification : false}
                bookingId={bookingId}
                onPayment={(totalPrice) => navigate('BarberServiceComplete', { customerId: customerId, totalPrice: totalPrice, bookingId })} />
        )
    }
}
