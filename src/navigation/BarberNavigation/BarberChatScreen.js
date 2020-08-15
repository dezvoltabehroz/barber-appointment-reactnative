/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberChatScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })


    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberChat />
        )
    }
}
