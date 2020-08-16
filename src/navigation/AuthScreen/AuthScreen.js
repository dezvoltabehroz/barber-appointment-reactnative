/** @format */

import React, { Component } from 'react'
import { Alert } from 'react-native';
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { actions } from '../../redux/actions/auth';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: true,
            barber: false,
            submit: false,
            loading: false
        }
    }

    handleLogin = async (email, password) => {
        const { navigate } = this.props.navigation
        const { customer } = this.state;
        let userData = { email, password };
        if (customer) {
            await this.props.actions.setUser(userData);
            navigate('Customer')
            this.setState({ submit: false })
        } else {
            await this.props.actions.setUser(userData);
            navigate('Barber')
            this.setState({ submit: false })
        }
    }


    render() {
        const { navigate } = this.props.navigation
        const { customer, barber, submit, loading } = this.state;
        return (
            <MainScreenPaths.Auth
                loading={loading}
                onLogin={(email, password) => this.handleLogin(email, password)}
                onPhone={() => customer ?
                    navigate('Customer', { screen: 'PhoneNumber' })
                    :
                    navigate('Barber', { screen: 'PhoneNumber' })}
                onContinueWithOutLogin={() => customer ? navigate('Customer') : Alert.alert("This screen is under Development")}
                onPressCustomer={() => this.setState({ customer: true, barber: false, submit: false })}
                onPressBarber={() => this.setState({ barber: true, customer: false, submit: false })}
                customer={customer}
                barber={barber}
                submit={(submit)}
                isSubmit={() => this.setState({ submit: true })}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)