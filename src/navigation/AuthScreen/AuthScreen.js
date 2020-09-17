/** @format */

import React, { Component } from 'react'
import { Alert } from 'react-native';
import { MainScreenPaths } from '../../screens';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
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
            const { navigate } = this.props.navigation
            const { customer } = this.state;
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn()
            let userData = {
                email: userInfo.user.email,
                name: userInfo.user.name,
                photo: userInfo.user.photo
            }
            await this.props.authActions.setSocialNetworkUserData(userData);
            customer ?
                navigate('Register', {
                    screen: 'PhoneNumber',
                })
                :
                navigate('Barber', { screen: 'PhoneNumber' })
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


    get_Response_Info = async (error, result) => {
        const { navigate } = this.props.navigation
        const { customer } = this.state;
        if (error) { Alert.alert('Error fetching data: ' + error.toString()); }
        else {
            let userData = {
                name: result.name,
                photo: result.picture.data.url
            }
            console.log(result);
            await this.props.authActions.setSocialNetworkUserData(userData);
            customer ?
                navigate('Register', {
                    screen: 'PhoneNumber',
                })
                :
                navigate('Barber', { screen: 'PhoneNumber' })
        }
    };


    onFacebookButtonPress = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        result.isCancelled
            ? Alert.alert('User cancelled the login process')
            : AccessToken.getCurrentAccessToken().then(data => {
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



    handleLogin = async (userData) => {
        const { navigate } = this.props.navigation
        await this.props.authActions.setUser(userData, navigate);
        this.setState({ submit: false })
        // } else {
        //     await this.props.authActions.setUser(userData);
        //     navigate('Barber')
        //     this.setState({ submit: false })
        // }
    }


    render() {
        const { navigate } = this.props.navigation
        const { customer, barber, submit, loading } = this.state;
        return (
            <MainScreenPaths.Auth
                loading={this.props?.user?.loading}
                onLogin={(userData) => this.handleLogin(userData)}
                onPhone={() => customer ?
                    navigate('Register', {
                        screen: 'PhoneNumber',
                    })
                    :
                    navigate('Barber', { screen: 'PhoneNumber' })}
                onContinueWithOutLogin={() => customer ? navigate('Customer') : Alert.alert("This screen is under Development")}
                onPressCustomer={() => this.setState({ customer: true, barber: false, submit: false })}
                onPressBarber={() => this.setState({ barber: true, customer: false, submit: false })}
                customer={customer}
                barber={barber}
                submit={(submit)}
                isSubmit={() => this.setState({ submit: true })}
                onGoogle={() => this._signIn}
                onFacebook={() => this.onFacebookButtonPress}
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)