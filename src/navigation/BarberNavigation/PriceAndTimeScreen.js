/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class PriceAndTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate } = this.props.navigation;
        const { item } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberPriceAndTime data={(item)} onNext={() => navigate('WorkingDays')} />
        )
    }
}
