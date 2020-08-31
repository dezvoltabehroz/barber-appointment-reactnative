/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class WorkingDaysScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleFunction = (data) => {
        const { navigate, goBack } = this.props.navigation;
        if (data.length == 0) {
            Alert.alert('Attention', 'Please select atleast one working day')
        }
        else {
            navigate('ScheduleTime', { itemDays: data })
        }
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberWorkingDays onNext={(data) => this.handleFunction(data)} />
        )
    }
}
