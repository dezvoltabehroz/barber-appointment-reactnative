/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { BookingServices } from '../../services';

export default class BarberServiceCompleteScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleOnHome = (userData) => {
        const { push, replace } = this.props.navigation;
        BookingServices.rateAndReviewBarberServices(userData)
            .then((res) => {
                console.log(res.data)
                if (res.data.status) {
                    replace('Home')
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <MainScreenPaths.Barber.BarberServiceComplete onHome={(userData) => this.handleOnHome(userData)} />
        )
    }
}
