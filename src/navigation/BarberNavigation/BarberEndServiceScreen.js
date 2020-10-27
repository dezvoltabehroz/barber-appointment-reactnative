/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import moment from 'moment'
import { BookingServices } from '../../services';
class BarberEndServiceScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleEndService = () => {
        const { navigate, goBack } = this.props.navigation
        const { bookingId } = this.props.route.params;
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            booking_id: bookingId,
            is_completed_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
        console.log(userData)
        BookingServices.barberEndServices(userData)
            .then((res) => {
                console.log(res.data)
                if (res.data.status) {
                    navigate('ServiceDetails', { bookingId })
                }
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        const { bookingId } = this.props.route.params;
        return (
            <MainScreenPaths.Barber.BarberEndService bookingId={(bookingId)} onEndService={() => this.handleEndService()} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(BarberEndServiceScreen)