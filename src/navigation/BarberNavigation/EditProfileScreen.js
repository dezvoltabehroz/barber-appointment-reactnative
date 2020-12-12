/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
class EditProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleLogout = async () => {
        const { navigate } = this.props.navigation;
        navigate('Auth')
        await this.props.authActions.removeUser();
    }

    on_Press_Accept = (data) => {
        const { push } = this.props.navigation
        push('BarberServiceAccept', { item: data })
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberEditProfile
                onServices={() => navigate("BarberEditServices")}
                onPortfolio={() => navigate("Portfolio")}
                onCertificate={() => navigate("LicenceAndCertificate")}
                onProfile={() => navigate('UpdateProfile')}
                onManageSchedule={() => navigate('ManageSchedule')}
                onExit={this.handleLogout}
                onAccept={(data) => this.on_Press_Accept(data)} />
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

export default connect(mapStateToProps)(EditProfileScreen)