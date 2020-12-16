/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class PhoneVerificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack,replace } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberPhoneVerification onVerify={()=>navigate('PhoneVerified')} onResend={()=>replace('PhoneNumber')} />
        )
    }
}
