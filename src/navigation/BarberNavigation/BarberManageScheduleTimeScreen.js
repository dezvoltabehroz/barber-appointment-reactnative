/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class BarberManageScheduleTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, replace, goBack } = this.props.navigation;
        const { data } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberManageScheduleTime
                data={data}
                navigation={this.props.navigation}
                onNext={() => this.props.navigation.replace('Home')}
                goBack={() => goBack()}
            />
        )
    }
}
