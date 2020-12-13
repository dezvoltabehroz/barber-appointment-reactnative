
import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class BarberAddBreakTimeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack, replace } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberAddBreakTime onNext={() => goBack()} replace={replace} />
        )
    }
}
