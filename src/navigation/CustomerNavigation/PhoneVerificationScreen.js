/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';

class PhoneVerificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleVerification = (value) => {
        const { navigate } = this.props.navigation
        this.props.authActions.verifyCode(value, navigate);

    }

    render() {
        const { goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.PhoneVerification loading={this.props.user.loading}
                onResend={() => goBack()} verificationCode={this.props.user.verificationCode.length == 6 ? this.props.user.verificationCode : null}
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