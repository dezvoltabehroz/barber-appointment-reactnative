/** @format */

import React, { Component } from 'react'
import { Alert } from 'react-native';
import { MainScreenPaths } from '../../screens';

export default class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: true,
            barber: false,
            submit: false,
            loading: false
        }
    }
    handleLogin = () => {
        const { navigate } = this.props.navigation
        const { customer } = this.state;
        this.setState({ submit: true });
        if (customer) {
            navigate('Customer')
            this.setState({ submit: false })
        } else {
            navigate('Customer')
            this.setState({ submit: false })
        }
    }


    render() {
        const { navigate } = this.props.navigation
        const { customer, barber, submit, loading } = this.state;
        return (
            <MainScreenPaths.Auth
                loading={loading}
                onLogin={this.handleLogin}
                onPhone={() => customer ?
                    navigate('Customer', { screen: 'PhoneNumber' })
                    :
                    navigate('Barber', { screen: 'PhoneNumber' })}
                onContinueWithOutLogin={() => customer ? navigate('Customer') : Alert.alert("This screen is under Development")}
                onPressCustomer={() => this.setState({ customer: true, barber: false, submit: false })}
                onPressBarber={() => this.setState({ barber: true, customer: false, submit: false })}
                customer={customer}
                barber={barber}
                submit={(submit)}
                isSubmit={(submit) => this.setState({ submit: submit })}
            />
        )
    }
}
