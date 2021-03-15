import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberEditWalletScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <MainScreenPaths.Barber.BarberEditWallet />
        )
    }
}
