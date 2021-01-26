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
            cat: item,
        }
        this.props.categoryActions.getSubCategories(userData, navigate)
    }


    handleLogout = async () => {
        const { replace } = this.props.navigation
        await this.props.authActions.removeUser(replace);
    }

    render() {
        const { navigate, push, goBack, toggleDrawer } = this.props.navigation
        return (
            <MainScreenPaths.Customer.Home
                goBack={goBack}
                onContactUs={() => navigate("ContactUs")}
                onAboutUs={() => navigate("AboutUs")}
                onExit={() => toggleDrawer()}
                loading={this.props.userAddresses.loading}
                onAppointments={() => navigate('Appointments')}
                searchBarber={() => navigate('BarberList', { search: true })}
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