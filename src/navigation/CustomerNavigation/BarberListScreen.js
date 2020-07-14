/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberListScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.BarberList bookNow={()=>navigate('Auth')} onPress={(data) => navigate('BarberProfile',{data})} />
        )
    }
}
