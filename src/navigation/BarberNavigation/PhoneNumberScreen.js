/** @format */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MainScreenPaths } from '../../screens';

export default class PhoneNumberScreen extends Component {
    navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberPhoneNumber onSendCode={()=>navigate('PhoneVerification')} />
        )
    }
}