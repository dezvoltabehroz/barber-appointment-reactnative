import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import themeStyle from '../../assets/styles/theme.style';
import { userAddressActions } from '../../redux/actions/addresses';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('USER');
        if (userToken) {
            let data = JSON.parse(userToken);
            this.props.actions.getUserProfile(data, this.props.navigation.navigate);
            this.props.address.allAddresses(data);
        }
        this.props.navigation.replace(userToken ? 'Customer' : 'Auth');
    };
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR }}>
                <ActivityIndicator size={60} color={themeStyle.PRIMARY_COLOR} />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

AuthLoadingScreen.propTypes = {};

AuthLoadingScreen.defaultProps = {};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(authActions, dispatch),
        address: bindActionCreators(userAddressActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
