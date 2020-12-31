/** @format */

import React, { Component } from 'react';
import { MainScreenPaths } from '../../screens';
export default class RescheduleBookingScreen extends Component {

    render() {
        const { navigate, goBack, push, replace } = this.props.navigation;
        return (
            <MainScreenPaths.Customer.RescheduleBooking onUpdate={() => replace('Customer', { screen: 'Home', params: { screen: 'Appointments' } })}
                data={this.props.route.params.data} />
        )
    }
}



