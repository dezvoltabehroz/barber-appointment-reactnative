/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class BarberManageScheduleTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, replace, goBack } = this.props.navigation;
        const { data, edit, item } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberManageScheduleTime
                data={data}
                edit={edit}
                item={item}
                navigation={this.props.navigation}
                onNext={() => this.props.navigation.replace('Home')}
                goBack={() => goBack()}
            />
        )
    }
}
