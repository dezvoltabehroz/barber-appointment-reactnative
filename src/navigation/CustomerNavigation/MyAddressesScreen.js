/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { userAddressActions } from '../../redux/actions/addresses';

class MyAddressesScreen extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount = async () => {
        // let userData = this.props.user.userData
        // await this.props.userAddressActions.allAddresses(userData);
    }


    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.MyAddresses
            onReferesh={this.componentDidMount}
             onEdit={() => navigate('EditYourAddress')} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        userAddresses: state.userAddresses || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userAddressActions: bindActionCreators(userAddressActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAddressesScreen)