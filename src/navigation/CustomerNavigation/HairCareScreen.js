/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class HairCareScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.HairCare onItemPress={() => navigate('Home')} />
        )
    }
}
