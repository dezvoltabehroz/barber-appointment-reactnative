/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import { RegisterUser } from '../../services';
class EditProfileScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })
    handleNext = (userData) => {
        const { replace, goBack } = this.props.navigation
        if (userData.imageChaged) {
            RegisterUser.updateProfilePicture(userData)
                .then(async (res) => {
                    if (res.data.status) {
                        RegisterUser.updateProfileInfo(userData)
                            .then(async (res) => { if (res.data.status) { await this.props.authActions.getUserProfile(userData, replace) } })
                            .catch((err) => { console.log(err) })
                    }
                })
                .catch((err) => { console.log(err) })
        } else {
            RegisterUser.updateProfileInfo(userData)
                .then(async (res) => { if (res.data.status) { await this.props.authActions.getUserProfile(userData, replace) } })
                .catch((err) => { console.log(err) })
        }
    }
    render() {
        const { replace, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Customer.EditProfile onNext={(userData) => this.handleNext(userData)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)