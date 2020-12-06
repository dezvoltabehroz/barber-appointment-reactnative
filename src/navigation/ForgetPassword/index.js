/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class ForgetPasswordScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack,replace } = this.props.navigation
        return (
            <MainScreenPaths.ForgetPassword onComplete={() => replace('ResetPassword')} />
        )
    }
}
