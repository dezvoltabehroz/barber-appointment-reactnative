/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class AddYourAddressScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })



    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.AddYourAddress address={(name, region) => navigate('EditYourAddress', { address: name, region:region })} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(AddYourAddressScreen)