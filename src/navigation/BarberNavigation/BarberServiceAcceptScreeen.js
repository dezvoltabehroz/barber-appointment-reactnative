/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class BarberServiceAcceptScreen extends Component {

    render() {
        const { navigate } = this.props.navigation
        const { item } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberServiceAccept item={(item)} arrivedAtlocation={() => navigate('BarberStartService')} />
        )
    }
}
