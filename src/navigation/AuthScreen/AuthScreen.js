/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class AuthScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    constructor(props) {
        super(props);
        this.state = {
            customer: true,
            barber: false
        }
    }
    render() {
        const { navigate, goBack } = this.props.navigation
        const { customer, barber } = this.state;
        return (
            <MainScreenPaths.Auth
                onLogin={() => customer ?
                    navigate('Customer')
                    :
                    navigate('Barber')}
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
