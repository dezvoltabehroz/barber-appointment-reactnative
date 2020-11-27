/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import moment from 'moment'
import { BookingServices } from '../../services';
class CustomerServicesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }
    static navigationOptions = ({ navigation }) => ({

    })

    handleApprove = (data) => {
        const { navigate, goBack } = this.props.navigation
        let userData = {
            id: data.id,
            booking_id: data.booking_id,
            is_services_accepted_time: moment().format('YYYY-MM-DD H:mm:ss'),
            userName: this.props.user.userData.full_name,
            barber_id: data.barber_id,
            token: data.token
        }
        BookingServices.approveBookingByCustomer(userData)
            .then((res) => {
                if (res.data.status) {
                    console.log(res.data)
                    navigate('ServiceComplete', { userData: data });
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        const { userData } = this.props.route.params;
        return (
            <MainScreenPaths.Customer.CustomerServices userData={userData} onApproved={(userData) => this.handleApprove(userData)} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
    };
};

export default connect(mapStateToProps)(CustomerServicesScreen)