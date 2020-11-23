import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { RegisterUser } from '../../services';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from '../../redux/actions/auth';
import themeStyle from '../../assets/styles/theme.style';
import { userAddressActions } from '../../redux/actions/addresses';
import { notificationActions } from '../../redux/actions/notification';
import messaging from '@react-native-firebase/messaging';
import io from 'socket.io-client';

const socket = io.connect("http://ec2-18-204-20-183.compute-1.amazonaws.com:3000");


class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);

        this._bootstrapAsync();

    }

    _bootstrapAsync = async () => {
        socket.on("connection", function(data) {
            console.log(data)
        });
        const userToken = await AsyncStorage.getItem('USER');
        if (userToken) {
            let data = JSON.parse(userToken);
            socket.on("updateNotification", async (data) => {
                if (data.receiver_id === data.id) {
                    await this.props.notification.getNotification(data);
                }
            });
            this.requestUserPermission(data)

        } else {
            this.props.navigation.replace('Auth');

        }
        // this.props.navigation.replace(userToken ? 'Customer' : 'Auth');
    };
    requestUserPermission = async function (data) {
        try {
            const granted = await messaging().requestPermission({
                alert: true,
                announcement: false,
                badge: true,
                carPlay: true,
                provisional: false,
                sound: true,
            });
            if (granted) {
                if (!messaging().isDeviceRegisteredForRemoteMessages) {
                    await messaging().registerDeviceForRemoteMessages();
                }
                const authStatus = await messaging().hasPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (enabled) {
                    this.getFcmToken(data);
                }
            }
            // User has authorised

        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }

    }

    getFcmToken = async (userData) => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            let data = {
                id: userData.id,
                fcmToken: fcmToken,
                token: userData.token
            }
            RegisterUser.updateFCMToken(data)
                .then(async (res) => {
                    if (res.data.status) {
                        if (userData.type == 'customer') {
                            await this.props.actions.getUserProfile(userData, this.props.navigation.replace);
                            await this.props.notification.getNotification(userData);
                            // this.props.address.allAddresses(data);
                        }
                        else {
                            await this.props.actions.getUserProfile(userData, this.props.navigation.replace);
                            // this.props.address.allAddresses(data);
                            await this.props.notification.getNotification(userData);
                        }
                    }
                })
        } else {
            console.log("Failed", "No token received");
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themeStyle.PRIMARY_BACKGROUND_COLOR }}>
                <ActivityIndicator size={60} color={themeStyle.PRIMARY_COLOR} />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

AuthLoadingScreen.propTypes = {};

AuthLoadingScreen.defaultProps = {};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(authActions, dispatch),
        address: bindActionCreators(userAddressActions, dispatch),
        notification: bindActionCreators(notificationActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
