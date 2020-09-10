/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleLogout = async () => {
        const { navigate, } = this.props.navigation
        let { isUserLogedIn } = this.props.user;
        if (isUserLogedIn) {
            navigate('Auth')
            await this.props.authActions.removeUser();
        }
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <MainScreenPaths.Customer.Home
                onContactUs={() => navigate("ContactUs")}
                onAboutUs={() => navigate("AboutUs")}
                onExit={this.handleLogout}
                onAppointments={()=>navigate('Appointments')}
                searchBarber={()=>navigate('BarberList')}
                myAddresses={()=>navigate('MyAddresses')}
                addNewAddress={()=>navigate('AddYourAddress')}
                onItemPress={(item, data) => navigate('SubCategory', { name: item, data: data })} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)