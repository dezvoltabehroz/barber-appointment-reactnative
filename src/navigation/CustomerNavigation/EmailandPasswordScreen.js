/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';

class EmailandPasswordScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleUpdate = async (email, password) => {
        const { navigate } = this.props.navigation
        let userData = { email, password };
        await this.props.authActions.setUser(userData);
        navigate('Customer',{screen:'Home'});
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.EmailandPassword onUpdate={(email, password) => this.handleUpdate(email, password)} />
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