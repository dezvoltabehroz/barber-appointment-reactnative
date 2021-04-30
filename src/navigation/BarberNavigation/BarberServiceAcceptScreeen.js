/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'
import { BookingServices } from '../../services';
class BarberServiceAcceptScreen extends Component {



    handleArrivedLocation = (data) => {
        const { bookingId, customerId } = this.props.route.params;
        const { navigate } = this.props.navigation;
        const { user } = this.props
        let userData = {
            id: user.userData.id,
            token: user.userData.token,
            booking_id: bookingId,
            is_arrived_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            userName: user.userData.full_name,
            customer_id: data.customer_id
        }
        BookingServices.arrivedAtCustomerLocation(userData)
            .then((res) => {
                if (res.data.status) {
                    navigate('BarberStartService', { bookingId: bookingId, customerId: customerId })
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { navigate } = this.props.navigation
        const { bookingId } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberServiceAccept
                bookingId={bookingId}
                onChat={(data) => navigate('BarberChat', { userData: data })}
                arrivedAtlocation={(data) => this.handleArrivedLocation(data)} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberServiceAcceptScreen)