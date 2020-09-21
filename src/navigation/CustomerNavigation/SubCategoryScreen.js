/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { categoryActions } from '../../redux/actions/category';
import { userAddressActions } from '../../redux/actions/addresses'

class SubCategoryScreen extends Component {

    handleOnItemPress = (item) => {
        const { navigate } = this.props.navigation;
        let userData = {
            id: this.props.user.userData.id,
            cat: item,
            token: this.props.user.userData.token
        }
        navigate('SubCategoryServices', { name: item.sub_category_name })
        this.props.categoryActions.getServices(userData)
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.SubCategory onItemPress={(item) => this.handleOnItemPress(item)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen)