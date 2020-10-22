/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class EditProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { replace, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.EditProfile onComplete={() => replace('UpdateProfile')} />
        )
    }
}
