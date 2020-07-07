/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class ResumeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberResume onNext={()=>navigate('Home')} />
        )
    }
}
