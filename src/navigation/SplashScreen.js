/** @format */

import React, { Component } from 'react'
import { Splash } from '../screens';

export default class SplashScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    componentDidMount() {
        const { navigate, goBack } = this.props.navigation
        setTimeout(() => {
            navigate('Auth')
        }, 4000);
    }
    render() {

        return (
            <Splash />
        )
    }
}
