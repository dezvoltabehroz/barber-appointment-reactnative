/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class EmailandPasswordScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberEmailandPassword onUpdate={() => navigate('Home')} />
        )
    }
}
