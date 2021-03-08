/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class ScheduleTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, replace, goBack } = this.props.navigation;
        // const { data, item } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberScheduleTime
                navigate={replace}
                // data={data}
                // item={item}
                goBack={() => goBack()}
                onNext={() => navigate('Barber', { screen: 'EditProfile' })} />
        )
    }
}
