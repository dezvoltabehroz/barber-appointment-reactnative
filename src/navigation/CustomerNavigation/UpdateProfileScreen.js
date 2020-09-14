/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

export default class UpdateProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleNext = async (name, gender, dob) => {
        const { navigate } = this.props.navigation
        let userData = { name, gender, dob };
        // await this.props.authActions.setUser(userData);
        navigate('AddYourAddress');
    }
    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.UpdateProfile onNext={(name, gender, dob) => this.handleNext(name, gender, dob)} />
        )
    }
}
