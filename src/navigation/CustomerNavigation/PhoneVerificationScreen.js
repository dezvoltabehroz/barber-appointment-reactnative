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
        const { verificationId } = this.props.route.params;
        const { navigate } = this.props.navigation
        let userData = {
            id: verificationId,
            phone: this.props.user.phone,
            code: value
        }
        this.props.authActions.verifyCode(userData, navigate);
        navigate('PhoneVerified');

    }

    render() {
        const { goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.PhoneVerification loading={this.props.user.loading}
                onResend={() => goBack()}
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