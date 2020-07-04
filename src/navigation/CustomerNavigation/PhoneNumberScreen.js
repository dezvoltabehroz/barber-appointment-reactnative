/** @format */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MainScreenPaths } from '../../screens';

export default class PhoneNumberScreen extends Component {
    navigationOptions = ({ navigation }) => ({
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter your phone number</Text></View>),

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.PhoneNumber onSendCode={() => navigate('PhoneVerification')} />
        )
    }
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Medium'
    }
})