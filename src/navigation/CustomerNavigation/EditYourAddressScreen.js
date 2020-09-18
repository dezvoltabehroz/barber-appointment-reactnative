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
        this.state = {
            edit: false
        }
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
    }

    handleUpdateAddress = async (data) => {
        const { navigate, goBack } = this.props.navigation
        let userData = data;
        userData = { ...userData, token: this.props.user.userData.token };
        console.log(userData);
        await this.props.userAddressActions.editAddress(userData, navigate);
        this.setState({ edit: false });

    }


    render() {
        const { navigate, goBack } = this.props.navigation
        const { address, region, data, edit } = this.props.route.params;

        return (
            <MainScreenPaths.Customer.EditYourAddress
                address={data != undefined ? data.address : address}
                region={data != undefined ? { latitude: data.latitude, longitude: data.longitude } : region}
                data={edit ? undefined : data}
                edit={edit}
                userId={this.props.user.userData.id}
                isUserLogged={this.props.user.isUserLogedIn}
                loading={this.props.addresses.loading}
                phone={this.props.user.phone}
                updateAddress={(data) => this.handleUpdateAddress(data)}
                onEdit={(data) => { console.log(data); navigate('AddYourAddress', { editAddress: data }) }}
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