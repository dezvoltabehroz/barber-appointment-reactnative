/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class ServiceDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate } = this.props.navigation;
        const { bookingId } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.ServiceDetails bookingId={bookingId} onPayment={() => navigate('BarberServiceComplete')} />
        )
    }
}
