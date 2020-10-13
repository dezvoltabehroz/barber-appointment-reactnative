/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
class PhoneVerificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleVerification = (value) => {
        const number =AsyncStorage.getItem('Phone');
        console.log('Number=======>',number);
        const { verificationId } = this.props.route.params;
        const { replace } = this.props.navigation
        let userData = {
            id: verificationId,
            phone: this.props.user.phone,
            code: value
        }
        this.props.authActions.verifyCode(userData, replace);
        navigate('PhoneVerified');

    }

    render() {
        const { goBack,replace } = this.props.navigation
        return (
            <MainScreenPaths.Customer.PhoneVerification loading={this.props.user.loading}
                onResend={() => replace('PhoneNumber')}
                onVerify={(value) => this.handleVerification(value)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationScreen)