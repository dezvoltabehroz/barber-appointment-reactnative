/** @format */

import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';

class PhoneNumberScreen extends Component {
    navigationOptions = ({ navigation }) => ({
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitle: () => (<View><Text style={styles.headerTitleStyle}>Enter your phone number</Text></View>),

    })

    handleSendVerification = (number) => {
        const { navigate } = this.props.navigation
        this.props.authActions.sendVerificationCode(number, navigate)
        // navigate('EmailandPassword');
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.PhoneNumber loading={this.props.user.loading} onSendCode={(number) => this.handleSendVerification(number)} />
        )
    }
}

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: 'Poppins-Medium'
    }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberScreen)
