/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberServiceCompleteScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate } = this.props.navigation;
        return (
            <MainScreenPaths.Barber.BarberServiceComplete onNext={() => { }} />
        )
    }
}
