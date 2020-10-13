/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';

class UpdateProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleNext = async (userData) => {
        let number = await AsyncStorage.getItem('Phone');
        let phoneNumber = JSON.parse(number)
        console.log(phoneNumber)
        let data = userData;
        const { replace } = this.props.navigation
        await this.props.authActions.UpdateProfileInfo(data, phoneNumber, replace);
        // navigate('AddYourAddress');
    }
    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.UpdateProfile phone={this.props.user.phone} onNext={(userData) => this.handleNext(userData)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen)