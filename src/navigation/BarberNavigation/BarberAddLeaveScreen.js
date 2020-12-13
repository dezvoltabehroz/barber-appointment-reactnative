
import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberAddLeaveScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberAddLeave goBack={() => goBack()} replace={replace} />
        )
    }
}
