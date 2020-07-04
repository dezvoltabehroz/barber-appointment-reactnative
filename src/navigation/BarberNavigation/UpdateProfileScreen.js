/** @format */

import React, { Component } from 'react'
import { BarberUpdateProfile } from '../../screens';

export default class PhoneVerifiedScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <BarberUpdateProfile onUpdate={()=>navigate('BarberHome')} />
        )
    }
}
