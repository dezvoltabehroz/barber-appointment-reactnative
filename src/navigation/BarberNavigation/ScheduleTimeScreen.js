/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class ScheduleTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate } = this.props.navigation;
        const { itemDays } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberScheduleTime data={(itemDays)} onNext={() => Alert.alert("Next Screen is under development ")} />
        )
    }
}
