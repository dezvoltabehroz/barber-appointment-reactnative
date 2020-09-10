/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class EditYourAddressScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })



    render() {
        const { navigate, goBack } = this.props.navigation
        const { address, region } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.EditYourAddress address={address} region={region} onEdit={()=>navigate('AddYourAddress')} onNext={()=>navigate('EmailandPassword')} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(EditYourAddressScreen)