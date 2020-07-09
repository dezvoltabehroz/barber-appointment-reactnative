/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class ScheduleTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate } = this.props.navigation;
        const { itemDays } = this.props.route.params;
        // console.log(JSON.stringify(item));
        return (
            <MainScreenPaths.Barber.BarberScheduleTime data={(itemDays)} onNext={() => navigate('Home')} />
        )
    }
}
