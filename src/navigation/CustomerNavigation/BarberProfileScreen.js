/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Alert } from 'react-native';

class BarberProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleBookNow = (data) => {
        const { navigate } = this.props.navigation;
        let { isUserLogedIn } = this.props.user;
        if (isUserLogedIn) {
            let userdata = {
                id: this.props.user.userData.id,
                barber_id: data,
                token: this.props.user.userData.token
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
        const { data } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.BarberProfile 
            Auth={() => navigate("Auth")} 
            items={data} 
            bookNow={(data) => this.handleBookNow(data)} 
            onBarberPress={() => navigate('')} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(BarberProfileScreen)