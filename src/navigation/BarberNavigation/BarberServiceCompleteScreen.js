/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberServiceCompleteScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { push,replace } = this.props.navigation;
        return (
            <MainScreenPaths.Barber.BarberServiceComplete onHome={() => replace('Home')} />
        )
    }
}
