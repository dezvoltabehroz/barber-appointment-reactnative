/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberHome  />
        )
    }
}
