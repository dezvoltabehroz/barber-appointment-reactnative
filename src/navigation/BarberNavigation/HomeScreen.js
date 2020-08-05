/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { actions } from '../../redux/actions/auth';
class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleLogout = async () => {
        const { navigate, } = this.props.navigation
        let { isUserLogedIn } = this.props.user;
        if (isUserLogedIn) {
            navigate('Auth')
            await this.props.actions.removeUser();
        }
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberHome onContactUs={()=>navigate("ContactUs")} onAboutUs={()=>navigate("AboutUs")} onExit={this.handleLogout} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userAuth || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)