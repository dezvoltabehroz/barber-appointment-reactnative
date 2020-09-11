/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class MyAddressesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })



    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.MyAddresses  onEdit={()=>navigate('AddYourAddress')} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(MyAddressesScreen)