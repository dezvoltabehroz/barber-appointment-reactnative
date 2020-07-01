/** @format */

import React, { Component } from 'react'
import { Splash } from '@screens';
import { SafeAreaView } from 'react-navigation';

export default class SplashScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <Splash onAuth={() => console.log('I am OnAuth')} />
        )
    }
}
