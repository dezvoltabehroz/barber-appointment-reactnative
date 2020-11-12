/** @format */

import React, { Component } from 'react'
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { Barbers } from '../../services';
class PersonalInfoScreen extends Component {
    static navigationOptions = ({ navigation }) => ({

    })

    handleUploadPortfolio = (data) => {
        const { navigate, goBack } = this.props.navigation
        let userData = {
            id: this.props.user.userData.id,
            images: data
        }
        Barbers.uploadBarberPortfolio(userData)
            .then((res) => {
                if (res.data.status) {
                    goBack();
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { navigate, goBack } = this.props.navigation
        return (
            <MainScreenPaths.Barber.BarberPersonalInfo onNext={(data) => this.handleUploadPortfolio(data)} />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.authReducer || {}
    };
};

export default connect(mapStateToProps)(PersonalInfoScreen)