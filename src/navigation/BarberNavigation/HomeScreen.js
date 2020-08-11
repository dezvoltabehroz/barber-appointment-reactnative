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
        const { navigate } = this.props.navigation
        navigate('Auth')
        await this.props.actions.removeUser();
    }

    on_Press_Accept = (data) => {
        const { push } = this.props.navigation
        push('BarberServiceAccept', { item: data })
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberHome
                onContactUs={() => navigate("ContactUs")}
                onAboutUs={() => navigate("AboutUs")}
                onExit={this.handleLogout}
                onAccept={(data) => this.on_Press_Accept(data)} />
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