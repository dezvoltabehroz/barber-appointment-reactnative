/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { userAddressActions } from '../../redux/actions/addresses';
import { bindActionCreators } from "redux";

class EditAddressScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    handleUpdateAddress = async (data) => {
        const { push, goBack } = this.props.navigation
        let userData = data;
        userData = { ...userData, token: this.props.user.userData.token };
        console.log(userData);
        await this.props.userAddressActions.editAddress(userData, push);
        // await this.props.userAddressActions.allAddresses(data)
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        const { address, region, data } = this.props.route.params;
        console.log(address);
        console.log(region);
        console.log(data)
        return (
            <MainScreenPaths.Customer.EditAddress
                address={address}
                region={region}
                data={data}
                userId={this.props.user.userData.id}
                isUserLogged={this.props.user.isUserLogedIn}
                loading={this.props.addresses.loading}
                phone={this.props.user.phone}
                updateAddress={(data) => this.handleUpdateAddress(data)}
                onEdit={() => navigate('AddAddress')}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditAddressScreen)