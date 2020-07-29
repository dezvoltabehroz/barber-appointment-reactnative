/** @format */

import React, { Component } from 'react'
import { Alert } from 'react-native';
import { MainScreenPaths } from '../../screens';

export default class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: true,
            barber: false, loading: false
        }
    }

    render() {
        const { navigate } = this.props.navigation
        const { customer, barber, loading } = this.state;
        return (
            <MainScreenPaths.Auth
                loading={loading}
                onLogin={()=> customer ? navigate('Customer') : navigate('Customer')}
                onPhone={() => customer ?
                    navigate('Customer', { screen: 'PhoneNumber' })
                    :
                    navigate('Barber', { screen: 'PhoneNumber' })}
                onContinueWithOutLogin={() => customer ? navigate('Customer') : navigate('Barber')}
                onPressCustomer={() => this.setState({ customer: true, barber: false })}
                onPressBarber={() => this.setState({ barber: true, customer: false })}
                customer={customer}
                barber={barber}
            />
        )
    }
}
