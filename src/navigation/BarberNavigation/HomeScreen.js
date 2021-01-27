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
        let userData = {
            id: this.props.user.userData.id,
            token: this.props.user.userData.token,
        }
        this.props.categoryActions.getAllVendorServices(userData);
    }
    handleLogout = async () => {
        const { replace } = this.props.navigation;
        // navigate('Auth')
        await this.props.authActions.removeUser(replace);
    }

    on_Press_Booking = (data, bookingId, customerId, bookingDate, bookingTime, bookingDuration) => {
        const { push,navigate } = this.props.navigation
        navigate("Booking", { screen: 'BarberServiceAccept', params: { item: data, bookingId, customerId, bookingDate, bookingTime, bookingDuration } })
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
            .then((res) => { })
            .catch((err) => console.log(err))
    }

    render() {
        const { navigate, goBack, toggleDrawer } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberHome
                onEditProfile={() => navigate("EditProfile")}
                onBookingHistory={() => navigate('BarberBookingHistory')}
                onContactUs={() => navigate("ContactUs")}
                onAboutUs={() => navigate("AboutUs")}
                onExit={() => toggleDrawer()}
                onView={(data, bookingId, customerId, bookingDate, bookingTime, bookingDuration) => this.on_Press_Booking(data, bookingId, customerId, bookingDate, bookingTime, bookingDuration)}
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