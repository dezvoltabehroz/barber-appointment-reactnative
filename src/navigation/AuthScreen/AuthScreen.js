/** @format */

import React, { Component } from 'react'
import { Alert } from 'react-native';
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { actions } from '../../redux/actions/auth';
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
} from 'react-native-fbsdk';
import {
    GoogleSignin,
    statusCodes,
} from 'react-native-google-signin';

class AuthScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: true,
            barber: false,
            submit: false,
            loading: false,
            user_name: '',
            token: '',
            profile_pic: '',
        }
    }

    componentDidMount = () => {
        GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            webClientId: '823617941270-asceudmgg1gc8al2njtcgam6avkia0kn.apps.googleusercontent.com',
        });
    }

    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn()
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };


    get_Response_Info = (error, result) => {
        if (error) { Alert.alert('Error fetching data: ' + error.toString()); }
        else {
            console.log(result)
            this.setState({ user_name: 'Welcome' + ' ' + result.name });
            this.setState({ token: 'User Token: ' + ' ' + result.id });
            this.setState({ profile_pic: result.picture.data.url });
        }
    };


    onFacebookButtonPress = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        else {
            AccessToken.getCurrentAccessToken().then(data => {
                const accessToken = data.accessToken;
                const processRequest = new GraphRequest(
                    '/me',
                    {
                        accessToken,
                        parameters: {
                            fields: { string: 'name,gender,birthday,location{location},picture.type(large)', },
                        },
                    },
                    this.get_Response_Info
                );
                new GraphRequestManager().addRequest(processRequest).start();
            });
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
                onGoogle={()=>this._signIn}
                onFacebook={()=>this.onFacebookButtonPress}
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