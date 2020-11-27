/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class NotificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, replace, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.Notification onItemPress={(bookingId, cancelled) => navigate('ServiceDetails', { bookingId: bookingId,cancelled, notification: true })} />
        )
    }
}
