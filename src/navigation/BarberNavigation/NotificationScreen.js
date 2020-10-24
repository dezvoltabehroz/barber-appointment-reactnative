/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class NotificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { replace, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.Notification onComplete={()=>replace('UpdateProfile')} />
        )
    }
}
