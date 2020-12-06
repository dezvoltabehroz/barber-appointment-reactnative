/** @format */

import React, { Component } from 'react'
import { Alert } from 'react-native';
import { MainScreenPaths } from '../../screens';
import { RegisterUser } from '../../services';

export default class NewPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    handleNewPassword = (password) => {
        const { id } = this.props.route.params;
        this.setState({ loading: true })
        let userData = {
            id: id,
            password: password
        }
        const { navigate, goBack, replace } = this.props.navigation
        RegisterUser.updatePassword(userData)
            .then((respone) => {
                if (respone.data.status) {
                    navigate('Auth')
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
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.NewPassword loading={this.state.loading} onComplete={(password) => this.handleNewPassword(password)} />
        )
    }
}
