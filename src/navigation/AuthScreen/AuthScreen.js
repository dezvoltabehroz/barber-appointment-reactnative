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
        const { navigate, goBack } = this.props.navigation
        const { customer, barber } = this.state;

        if (customer) {
            this.setState({loading:true})
            if (email != '' && password != '') {
                this.setState({loading:false})
                navigate('Customer');
            }
            else {
                alert('Incorrect Username or Password');
                this.setState({loading:false})
            }
        }
        else {
            this.setState({loading:true})
            if (email != '' && password != '') {
                this.setState({loading:false})
                // navigate('Customer');
            }
            else {
                alert('Incorrect Username or Password');
                this.setState({loading:false})
            }
        }
    }

    render() {
        const { navigate, goBack } = this.props.navigation
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
