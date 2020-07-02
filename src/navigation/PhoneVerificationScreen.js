/** @format */

import React, { Component } from 'react'
import { PhoneVerification } from '../screens';

export default class PhoneVerificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <PhoneVerification  />
        )
    }
}
