/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { userAddressActions } from '../../redux/actions/addresses';
class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        }
    }
    componentWillMount = async () => {
        let userData = this.props.user.userData
        await this.props.userAddressActions.allAddresses(userData);
    }

    handleLogout = async () => {
        const { navigate, } = this.props.navigation
        let { isUserLogedIn } = this.props.user;
        if (isUserLogedIn) {
            await this.props.authActions.removeUser(navigate);
        }
    }

    render() {
        const { navigate } = this.props.navigation
        return (
            <MainScreenPaths.Customer.Home
                onContactUs={() => navigate("ContactUs")}
                onAboutUs={() => navigate("AboutUs")}
                onExit={this.handleLogout}
                // allAddresses={this.state.addresses}
                loading={this.props.userAddresses.loading}
                onAppointments={() => navigate('Appointments')}
                onReferesh={this.componentWillMount}
                searchBarber={() => navigate('BarberList')}
                myAddresses={() => navigate('MyAddresses')}
                addNewAddress={() => navigate('AddYourAddress')}
                onItemPress={(item, data) => navigate('SubCategory', { name: item, data: data })} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {},
        userAddresses: state.userAddresses || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userAddressActions: bindActionCreators(userAddressActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)