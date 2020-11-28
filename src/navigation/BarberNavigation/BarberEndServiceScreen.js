/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import moment from 'moment'
import { BookingServices } from '../../services';
class BarberEndServiceScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleEndService = (id) => {
        const { navigate, goBack } = this.props.navigation
        const { bookingId, customerId } = this.props.route.params;
        console.log(customerId)
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            userName: this.props.user.userData.full_name,
            booking_id: bookingId,
            is_completed_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            customer_id: id
        }
        BookingServices.barberEndServices(userData)
            .then((res) => {
                if (res.data.status) {
                    navigate('ServiceDetails', { bookingId: bookingId, customerId: customerId, history: false })
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        const { bookingId } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberEndService bookingId={(bookingId)} onEndService={(id) => this.handleEndService(id)} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberEndServiceScreen)