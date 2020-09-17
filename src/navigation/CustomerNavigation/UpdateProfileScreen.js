/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
class UpdateProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleNext = async (userData) => {
        let phone = this.props?.user?.phone
        let data = userData;
        const { navigate } = this.props.navigation
        await this.props.authActions.UpdateProfileInfo(data, phone, navigate);
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