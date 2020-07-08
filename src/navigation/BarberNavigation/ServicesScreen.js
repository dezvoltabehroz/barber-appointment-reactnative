/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class ServicesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberServices onNext={() => navigate('Home')} />
        )
    }
}
