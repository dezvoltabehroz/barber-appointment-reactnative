/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { userAddressActions } from '../../redux/actions/addresses';
import { bindActionCreators } from "redux";

class EditYourAddressScreen extends Component {
    constructor(props) {
        super(props);
    }

    handleOnNext = async (userData) => {
        const { navigate, goBack } = this.props.navigation
        await this.props.userAddressActions.addPresonalAddress(userData, navigate)
        // navigate('EmailandPassword')
    }

    handleSaveNewAddress = async (userData) => {
        const { navigate, goBack } = this.props.navigation
        let data = { ...userData };
        data = { ...data, id: this.props.user.userData.id, token: this.props.user.userData.token };
        console.log(data);
        await this.props.userAddressActions.addNewAddress(data, navigate);
        await this.props.userAddressActions.allAddresses(data)
        // navigate('EmailandPassword')
    }

    handleUpdateAddress = async (data) => {
        const { navigate, goBack } = this.props.navigation
        let userData = data;
        userData = { ...userData, token: this.props.user.userData.token };
        console.log(userData);
        await this.props.userAddressActions.editAddress(userData, navigate);

    }


    render() {
        const { navigate, goBack } = this.props.navigation
        const { address, region, data } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.EditYourAddress
                address={address}
                region={region}
                data={data}
                isUserLogged={this.props.user.isUserLogedIn}
                loading={this.props.addresses.loading}
                phone={this.props.user.phone}
                updateAddress={(data) => this.handleUpdateAddress(data)}
                onEdit={() => navigate('AddYourAddress')}
                saveNewAddress={(userData) => this.handleSaveNewAddress(userData)}
                onNext={(userData) => this.handleOnNext(userData)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        addresses: state.userAddresses || {},
        user: state.authReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        userAddressActions: bindActionCreators(userAddressActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditYourAddressScreen)