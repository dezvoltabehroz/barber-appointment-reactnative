/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class CustomerServicesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })


    render() {
        const { navigate, goBack } = this.props.navigation
        const { userData } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.CustomerServices userData={userData} onApproved={(userData) => navigate('ServiceComplete',{userData})} />
        )
    }
}
