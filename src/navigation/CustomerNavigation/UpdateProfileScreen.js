/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class PhoneVerifiedScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.UpdateProfile onUpdate={()=>navigate('Home')} />
        )
    }
}
