/** @format */

import React, { Component } from 'react'
import { Auth } from '../screens';

export default class AuthScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <Auth />
        )
    }
}
