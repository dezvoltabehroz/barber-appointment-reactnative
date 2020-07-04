/** @format */

import React, { Component } from 'react'
import { BarberPhoneVerification } from '../../screens';

export default class PhoneVerificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <BarberPhoneVerification onVerify={()=>navigate('PhoneVerified')} />
        )
    }
}
