/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { userAddressActions } from '../../redux/actions/addresses';

import { categoryActions } from '../../redux/actions/category';

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        }
    }

    handleItemPress = (item) => {
        const { navigate } = this.props.navigation;
        navigate('SubCategory', { name: item.category_name })
        let userData = {
            id: this.props.user.userData.id,
            cat: item,
            token: this.props.user.userData.token
        }
        this.props.categoryActions.getSubCategories(userData, navigate)
    }


    handleLogout = async () => {
        const { replace } = this.props.navigation
        let { isUserLogedIn } = this.props.user;
        if (isUserLogedIn) {
            await this.props.authActions.removeUser(replace);
        }
    }

    render() {
        const { navigate, push } = this.props.navigation
        return (
            <MainScreenPaths.Customer.Home
                onContactUs={() => navigate("ContactUs")}
                onAboutUs={() => navigate("AboutUs")}
                onExit={this.handleLogout}
                loading={this.props.userAddresses.loading}
                onAppointments={() => navigate('Appointments')}
                onReferesh={this.componentDidMount}
                navigate={push}
                searchBarber={() => navigate('BarberList')}
                myAddresses={() => navigate('MyAddresses')}
                addNewAddress={() => navigate('AddYourAddress')}
                onItemPress={(item) => this.handleItemPress(item)} />
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
        userAddressActions: bindActionCreators(userAddressActions, dispatch),
        categoryActions: bindActionCreators(categoryActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)