/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class AppointmentsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleOnView = () => {
        const { navigate } = this.props.navigation;
        let { isUserLogedIn } = this.props.user;
        if (isUserLogedIn) {
            navigate('CustomerServices')
        }
        else {
            Alert.alert("Attention",
                "You need to be a registered member to explore more.",
                [
                    {
                        text: "Cancel",
                        onPress: () => { },
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => navigate("Auth") }
                ],
            )
        }
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.Appointments onView={()=>this.handleOnView}  />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userAuth || {}
    };
};


export default connect(mapStateToProps)(AppointmentsScreen)