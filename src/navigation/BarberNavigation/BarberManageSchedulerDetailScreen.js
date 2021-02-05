/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class BarberManageScheduleDetailScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, replace, goBack } = this.props.navigation;
        const { item } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberManageSchedulerDetails
                item={item}
                navigation={this.props.navigation}
                onNext={() => this.props.navigation.replace('Home')}
                goBack={() => goBack()}
            />
        )
    }
}
