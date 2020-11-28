/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux'

class NotificationScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleViewBookingDetail = (bookingId, barberId) => {
        const { navigate, replace, goBack } = this.props.navigation
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            booking_id: bookingId,
            barber_id: barberId,
            type: this.props.user.userData.type,
        }
        navigate('CustomerServices', { userData })
    }

    render() {
        const { navigate, replace, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.Notification onItemPress={(bookingId, barberId) => this.handleViewBookingDetail(bookingId, barberId)} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};


export default connect(mapStateToProps)(NotificationScreen)