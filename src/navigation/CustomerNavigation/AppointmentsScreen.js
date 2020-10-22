/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class AppointmentsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleOnView = (bookingId,barberId) => {
        const { navigate } = this.props.navigation;
        let { isUserLogedIn } = this.props.user;
        if (isUserLogedIn) {
            let userData = {
                id: this.props.user.userData.id,
                token: this.props.user.userData.token,
                booking_id: bookingId,
                barber_id:barberId
            }
            navigate('CustomerServices', { userData })
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
            <MainScreenPaths.Customer.Appointments onView={(bookingId,barberId) => this.handleOnView(bookingId,barberId)} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(AppointmentsScreen)