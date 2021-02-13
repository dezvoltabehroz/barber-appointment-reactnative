/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { BookingServices } from '../../services';

export default class ServiceCompleteScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleDone = (userData) => {
        const { replace, popToTop } = this.props.navigation;
        BookingServices.rateAndReviewBarberServices(userData)
            .then((res) => {
                if (res.data.status) {
                    popToTop();
                }
            })
    }

    render() {
        const { replace } = this.props.navigation;
        const { userData } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.ServiceComplete userData={userData} onHome={(userData) => this.handleDone(userData)} />
        )
    }
}
