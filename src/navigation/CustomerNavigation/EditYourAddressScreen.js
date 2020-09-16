/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { userAddressActions } from '../../redux/actions/addresses';
import { bindActionCreators } from "redux";

class EditYourAddressScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleOnNext = (userData) => {
        const { navigate, goBack } = this.props.navigation
        this.props.userAddressActions.addPresonalAddress(userData, navigate)
        // navigate('EmailandPassword')
    }


    render() {
        const { navigate, goBack } = this.props.navigation
        const { address, region } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.EditYourAddress
                address={address}
                region={region}
                loading={this.props.addresses.loading}
                phone={this.props.user.phone}
                onEdit={() => navigate('AddYourAddress')}
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