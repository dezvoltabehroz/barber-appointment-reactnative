/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';
import { connect } from 'react-redux'
import { BookingServices } from '../../services';
import moment from 'moment'
class BarberStartServiceScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleStartService = (id) => {
        const { bookingId, customerId } = this.props.route.params;
        const { navigate, goBack } = this.props.navigation
        const { user } = this.props;
        Alert.alert('Attention', 'Are you sure you want to start service',
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        let userData = {
                            id: user.userData.id,
                            userName: user.userData.full_name,
                            booking_id: bookingId,
                            is_started_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                            token: user.userData.token,
                            customer_id: id
                        }
                        BookingServices.barberStartServices(userData)
                            .then((res) => {
                                if (res.data.status) {
                                    navigate('BarberEndService', { bookingId: bookingId, customerId: customerId })
                                }
                            })
                            .catch((err) => console.log(err))
                    }
                }
            ],
        );


    }

    render() {
        const { navigate, goBack } = this.props.navigation
        const { bookingId } = this.props.route.params
        return (
            <MainScreenPaths.Barber.BarberStartService bookingId={bookingId} onStartService={(id) => this.handleStartService(id)} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberStartServiceScreen)
