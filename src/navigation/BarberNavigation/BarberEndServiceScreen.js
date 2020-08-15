/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberEndServiceScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })


    render() {
        const { navigate, goBack } = this.props.navigation
        const { start } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberEndService start={(start)} onEndService={(time) => navigate('ServiceDetails', { time })} />
        )
    }
}
