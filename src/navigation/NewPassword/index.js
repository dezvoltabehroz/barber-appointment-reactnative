/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class NewPasswordScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.NewPassword onComplete={() => navigate('Auth')} />
        )
    }
}
