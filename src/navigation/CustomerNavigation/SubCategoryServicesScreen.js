import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { userAddressActions } from '../../redux/actions/addresses';
import { categoryActions } from '../../redux/actions/category';

class SubCategoryServicesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.SubCategoryServices onItemPress={() => navigate('BarberList')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryServicesScreen)