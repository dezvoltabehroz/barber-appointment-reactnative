/** @format */

import React, { Component } from 'react'
import { Home } from '../screens';

export default class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <Home  />
        )
    }
}
