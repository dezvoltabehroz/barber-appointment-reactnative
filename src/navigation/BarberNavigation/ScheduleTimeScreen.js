/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class ScheduleTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, replace } = this.props.navigation;
        return (
            <MainScreenPaths.Barber.BarberScheduleTime navigate={replace}
                onNext={() => navigate('Barber', { screen: 'EditProfile' })} />
        )
    }
}
