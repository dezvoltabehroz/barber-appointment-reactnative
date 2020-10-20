/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import { Barbers } from '../../services';

class BarberListScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleBookNow = (data) => {
        const { navigate } = this.props.navigation;
        let { isUserLogedIn, userData } = this.props.user;
        if (isUserLogedIn) {
            let userdata = {
                id: userData.id,
                barber_id: data,
                token: userData.token
            }
            navigate('Booking', { userdata })
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
        const { search, serviceId } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.BarberList
                search={search}
                id={serviceId != 'undefined' ? serviceId : null}
                bookNow={(data) => this.handleBookNow(data)}
                onPress={(data) => navigate('BarberProfile', { data })} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(BarberListScreen)