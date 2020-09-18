/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class AddAddressScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })



    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.AddAddress
                address={(name, region) => navigate('EditAddress', { address: name, region: region, data: undefined })} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(AddAddressScreen)