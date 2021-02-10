/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { RegisterUser } from '../../services';

export default class ForgetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleResetPassword = (email) => {
        console.log('email: ', email)
        this.setState({ loading: true })
        const { navigate, goBack, replace } = this.props.navigation
        RegisterUser.getCodeForResetPass(email)
            .then((respone) => {
                if (respone.data.status) {
                    replace('ResetPassword', { email: email })
                    this.setState({ loading: false })
                }else{
                    console.log(respone.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.ForgetPassword loading={this.state.loading} onComplete={(email) => this.handleResetPassword(email)} />
        )
    }
}
