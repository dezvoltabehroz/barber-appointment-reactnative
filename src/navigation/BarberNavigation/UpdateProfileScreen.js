/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { Barbers } from '../../services';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
class UpdateProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleNext = async (userData) => {
        const { goBack } = this.props.navigation
        if (userData.image.uri != undefined) {
            Barbers.uploadBarberPersonalPic(userData)
                .then(async (res) => {
                    if (res.data.status) {
                        Barbers.updateBarberPersonalInfo(userData)
                            .then(async (res) => { if (res.data.status) { await this.props.authActions.getUserProfile(userData, goBack) } })
                            .catch((err) => { console.log(err) })
                    }
                })
                .catch((err) => { console.log(err) })
        } else {
            Barbers.updateBarberPersonalInfo(userData)
                .then(async (res) => { if (res.data.status) { await this.props.authActions.getUserProfile(userData, goBack) } })
                .catch((err) => { console.log(err) })
        }
    }
    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberUpdateProfile goBack={() => goBack()} onNext={(userData) => this.handleNext(userData)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen)