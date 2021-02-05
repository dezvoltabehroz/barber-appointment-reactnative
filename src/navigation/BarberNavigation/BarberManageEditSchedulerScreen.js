/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class BarberManageEditSchedulerScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, replace, goBack } = this.props.navigation;
        const { item, edit } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberManageEditScheduler
                item={item}
                edit={edit}
                navigation={this.props.navigation}
                onNext={() => this.props.navigation.replace('Home')}
                goBack={() => goBack()}
            />
        )
    }
}
