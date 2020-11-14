import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class AddPriceAndTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { item } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberAddPriceAndTime data={item} addService={() => navigate('EditProfile')} />
        )
    }
}
