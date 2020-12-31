/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class CustomerChatScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })


    render() {
        const { navigate, goBack } = this.props.navigation
        const { userData } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.CustomerChat barberData={userData} />
        )
    }
}
