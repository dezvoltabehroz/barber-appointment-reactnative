/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment'
import { BookingServices } from '../../services';
class BarberServiceAcceptScreen extends Component {



    handleArrivedLocation = () => {
        const { bookingId, customerId } = this.props.route.params;
        const { navigate } = this.props.navigation;
        const { user } = this.props
        let userData = {
            id: user.userData.id,
            token: user.userData.token,
            booking_id: bookingId,
            is_arrived_time: moment().format('YYYY-MM-DD HH:mm:ss')
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
        const { item, bookingId } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberServiceAccept
                item={(item)}
                bookingId={bookingId}
                onChat={() => navigate('BarberChat')}
                arrivedAtlocation={this.handleArrivedLocation} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberServiceAcceptScreen)