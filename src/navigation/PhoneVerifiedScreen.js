/** @format */

import React, { Component } from 'react'
import { PhoneVerified } from '../screens';

export default class PhoneVerifiedScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <PhoneVerified onComplete={()=>navigate('')} />
        )
    }
}
