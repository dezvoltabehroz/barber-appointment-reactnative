/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';

export default class ServicesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleFunction = (data) => {
        const { navigate, goBack } = this.props.navigation;
        if (data.length == 0) {
            Alert.alert('Attention', 'Please select atleast one service')
        }
        else {
            navigate('PriceandTime', { item: data })
        }
    }

    render() {
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberServices navigate={replace} onNext={(data) => this.handleFunction(data)} />
        )
    }
}
