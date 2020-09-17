/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';

class EmailandPasswordScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleUpdate = async (userData) => {
        const { navigate } = this.props.navigation
        await this.props.authActions.UpdateEmailAddressandToken(userData,navigate);
        // navigate('Customer',{screen:'Home'});
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.EmailandPassword
            phone={this.props.user.phone}
            loading={this.props.user.loading}
            onUpdate={(userData) => this.handleUpdate(userData)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailandPasswordScreen)