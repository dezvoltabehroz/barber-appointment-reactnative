/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        const { data } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.BarberProfile items={(data)} bookNow={()=>navigate('Auth')} onBarberPress={() => navigate('')} />
        )
    }
}
