/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { BookingServices } from '../../services';
class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleLogout = async () => {
        const { navigate } = this.props.navigation;
        navigate('Auth')
        await this.props.authActions.removeUser();
    }

    on_Press_Accept = (data, bookingId, customerId) => {
        const { push } = this.props.navigation
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            booking_id: bookingId
        }
        BookingServices.acceptBookingOfCustomer(userData)
            .then((res) => {
                console.log(res.data)
                if (res.data.status) {
                    push('BarberServiceAccept', { item: data, bookingId, customerId })
                }
            })
            .catch((err) => console.log(err))

    }
    on_Press_Booking = (data, bookingId, customerId) => {
        const { push } = this.props.navigation
        push('BarberServiceAccept', { item: data, bookingId, customerId })
    }

    on_Press_Decline = (data) => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            booking_id: data
        }
        BookingServices.declineBookingOfCustomer(userData)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberHome
                onEditProfile={() => navigate("EditProfile")}
                onBookingHistory={() => navigate('BarberBookingHistory')}
                onContactUs={() => navigate("ContactUs")}
                onAboutUs={() => navigate("AboutUs")}
                onExit={this.handleLogout}
                onAccept={(data, bookingId, customerId) => this.on_Press_Accept(data, bookingId, customerId)}
                onView={(data, bookingId, customerId) => this.on_Press_Booking(data, bookingId, customerId)}
                onDecline={(data) => this.on_Press_Decline(data)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
    };
};

export default connect(mapStateToProps)(HomeScreen)