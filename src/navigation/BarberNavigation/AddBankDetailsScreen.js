import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class AddBankDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <MainScreenPaths.Barber.AddBankDetails goBack={()=>{goBack();goBack();}} />
        )
    }
}
