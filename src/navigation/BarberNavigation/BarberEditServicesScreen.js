/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class PriceAndTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate,goBack } = this.props.navigation;
        return (
            <MainScreenPaths.Barber.BarberEditServices  onNext={(getData) => navigate('AddServices',{getData})} />
        )
    }
}
