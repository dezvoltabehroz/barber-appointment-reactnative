/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class PhoneNumberScreen extends Component {

    render() {
        const { navigate } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberPhoneNumber onSendCode={() => navigate('PhoneVerification')} />
        )
    }
}