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
        this.state = {

        }
    }
    componentDidMount = async () => {
        let userData = this.props.user.userData
        await this.props.userAddressActions.allAddresses(userData);
    }

    handleOnDelete = async (userData) => {
        let data = { ...userData };
        data = { ...userData, token: this.props.user.userData.token }
        await this.props.userAddressActions.deleteAddress(data)
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.MyAddresses
                addAddress={() => navigate('AddYourAddress', { editAddress: false, data: undefined })}
                onReferesh={this.componentDidMount}
                onDelete={(data) => this.handleOnDelete(data)}
                onEdit={(data) => navigate('EditYourAddress', { data })} />
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