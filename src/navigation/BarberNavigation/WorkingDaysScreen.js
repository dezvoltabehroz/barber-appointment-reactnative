/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class WorkingDaysScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleFunction = (data, item) => {
        const { navigate, goBack } = this.props.navigation;
        if (data.length == 0) {
            Alert.alert('Attention', 'Please select atleast one working day')
        }
        else {
            navigate('ScheduleTime', { data, item })
        }
    }

    render() {
        const { navigate, goBack, replace } = this.props.navigation;
        return (
            <MainScreenPaths.Barber.BarberWorkingDays navigate={replace} onNext={(data, item) => this.handleFunction(data, item)} />
        )
    }
}
