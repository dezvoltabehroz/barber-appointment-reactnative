/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: true,
            barber: false, loading: false
        }
    }

    loginFunction = (email, password) => {
        const { navigate } = this.props.navigation
        const { customer } = this.state;

        if (email != '' && password != '') {
            this.setState({ loading: false })
            const regex = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
            if (email.match(regex)) {
                customer ? navigate('Customer') : null /*navigate('Barber');*/
            }
            else {
                alert("Email is Incorrect");
            }

        }
        else {
            alert('Username/Email and Password null');
            this.setState({ loading: false })
        }
    }

    render() {
        const { navigate } = this.props.navigation
        const { customer, barber, loading } = this.state;
        return (
            <MainScreenPaths.Auth
                loading={loading}
                onLogin={(email, password) => this.loginFunction(email, password)}
                onPhone={() => customer ?
                    navigate('Customer', { screen: 'PhoneNumber' })
                    :
                    navigate('Barber', { screen: 'PhoneNumber' })}
                onPressCustomer={() => this.setState({ customer: true, barber: false })}
                onPressBarber={() => this.setState({ barber: true, customer: false })}
                customer={customer}
                barber={barber}
            />
        )
    }
}
