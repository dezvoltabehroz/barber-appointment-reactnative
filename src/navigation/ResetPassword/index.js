/** @format */

import React, { Component } from 'react'
import { Alert } from 'react-native';
import { MainScreenPaths } from '../../screens';
import { RegisterUser } from '../../services';

export default class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleVerifyCode = (code) => {
        this.setState({ loading: true })
        const { navigate, goBack, replace } = this.props.navigation
        RegisterUser.verifyCodeForResetPass(code)
            .then((respone) => {
                if (respone.data.status) {
                    replace('NewPassword', { id: respone.data.data[0].id })
                    this.setState({ loading: false })
                }
                else {
                    Alert.alert('Attension', respone.data.message)
                    this.setState({ loading: false })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.ResetPassword loading={this.state.loading} onVerify={(code) => this.handleVerifyCode(code)} />
        )
    }
}
