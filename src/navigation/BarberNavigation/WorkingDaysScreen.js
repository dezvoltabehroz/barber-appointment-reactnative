/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class WorkingDaysScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })


    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberWorkingDays onNext={(data) => navigate('Home', { item: data })} />
        )
    }
}
