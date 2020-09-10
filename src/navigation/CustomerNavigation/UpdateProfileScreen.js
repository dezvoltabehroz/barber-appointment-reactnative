/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class UpdateProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.UpdateProfile onNext={()=>navigate('AddYourAddress')} />
        )
    }
}
