
import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class LicenceAndCertificateScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberLicenceAndCertificate onNext={()=>goBack()} />
        )
    }
}
