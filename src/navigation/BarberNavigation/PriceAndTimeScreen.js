import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class PriceAndTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack,replace } = this.props.navigation;
        return (
            <MainScreenPaths.Barber.BarberPriceAndTime  navigate={replace} addService={() => navigate('WorkingDays')} />
        )
    }
}
