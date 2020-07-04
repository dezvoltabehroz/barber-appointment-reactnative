/** @format */

import React, { Component } from 'react'
import { BarberPhoneVerified } from '../../screens';

export default class PhoneVerifiedScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <BarberPhoneVerified onComplete={()=>navigate('UpdateProfile')} />
        )
    }
}
