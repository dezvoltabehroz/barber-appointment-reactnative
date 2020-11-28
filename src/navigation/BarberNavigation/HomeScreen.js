/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { BookingServices } from '../../services';
import { categoryActions } from '../../redux/actions/category';
class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    componentDidMount = () => {
        this.props.categoryActions.getAllVendorServices();
    }
    handleLogout = async () => {
        const { replace } = this.props.navigation;
        // navigate('Auth')
        await this.props.authActions.removeUser(replace);
    }

    on_Press_Booking = (data, bookingId, customerId, bookingDate, bookingTime) => {
        const { push } = this.props.navigation
        push('BarberServiceAccept', { item: data, bookingId, customerId, bookingDate, bookingTime })
    }

    on_Press_Decline = (data, id) => {
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
            booking_id: data,
            userName: this.props.user.userData.full_name,
            customer_id: id
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
                onView={(data, bookingId, customerId, bookingDate, bookingTime) => this.on_Press_Booking(data, bookingId, customerId, bookingDate, bookingTime)}
                onDecline={(data, id) => this.on_Press_Decline(data, id)} />
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
        categoryActions: bindActionCreators(categoryActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)