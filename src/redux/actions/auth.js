import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    LOADING_SUCCESS,
    USER_UPDATE_PROFILE_INFO_SUCCESS,
    USER_EMAIL_AND_PASSWORD_SUCCESS,
    HEALTH_AND_SEFATY_SUCCESS,
    WRONG_CODE_ERROR,
    EXPIRE_CODE_ERROR
} from '../types';
import { RegisterUser } from '../../services';
import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { categoryActions } from './category';
import { barberActions } from './barbers';
import { notificationActions } from './notification'
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import io from 'socket.io-client';
const socket = io.connect('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000'); //dev

const setUserProfile = (userData) => {
    return (dispatch) => {
        if (userData) {
            dispatch({ type: USER_LOGIN_SUCCESS, userData: userData, })
            if (userData.type == 'customer') {
                dispatch(barberActions.getBarbersList(userData));
                dispatch(categoryActions.getCategories(userData));
            }
            dispatch(notificationActions.getNotification(userData));
        }
    }
};

const getUserProfile = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.getUserProfile(userData)
            .then(async (responseData) => {
                if (responseData.data.success != 'undefined' && responseData.data.success == false) {
                    dispatch(removeUser(navigate));
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
                else {
                    if (responseData.data.status) {
                        socket.on("updateNotification", async ({ receiver_id }) => {
                            if (receiver_id === responseData.data.userData[0].id) {
                                await dispatch(notificationActions.getNotification(responseData.data.userData[0]));
                            }
                        });
                        await dispatch(setUserProfile(responseData.data.userData[0]))
                        AsyncStorage.setItem('USER', JSON.stringify(responseData.data.userData[0]))
                        if (navigate) {
                            if (responseData.data.userData[0].type == "customer") {
                                navigate('Customer');
                            } else if (userData.update) {
                                navigate();
                            }
                            else {

                                switch (responseData.data.userData[0].steps_count) {
                                    case 0:
                                        navigate('Services');
                                        break;
                                    case 1:
                                        navigate('PriceandTime');
                                        break;
                                    case 2:
                                        navigate('WorkingDays');
                                        break;
                                    case 3:
                                        navigate('ScheduleTime');
                                        break;
                                    default:
                                        if (responseData.data.userData[0].is_verified == "1") {
                                            navigate('Barber');
                                        }
                                        else {
                                            dispatch(removeUser(navigate, userData))
                                        }
                                        break;
                                }
                            }
                        }
                        dispatch({ type: LOADING_SUCCESS, loading: false })
                    }
                    // else {
                    //     Alert.alert(responseData.data.message)
                    //     dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }

            })
            .catch(err => { console.log(err) })
    };
};

const setSocialNetworkUserData = (userData) => {
    return ({
        type: USER_SOCIALNETWORK_USERDATA_SUCCESS,
        userData
    })
};

const sendVerificationCode = (number, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.sendCodeToPhoneNumber(number)
            .then(response => {
                if (response.data.status) {
                    auth().verifyPhoneNumber(number, 60)
                        .on('state_changed', (phoneAuthSnapshot) => {
                            switch (phoneAuthSnapshot.state) {
                                case auth.PhoneAuthState.CODE_SENT:
                                    dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: number }, loading: !loading })
                                    AsyncStorage.setItem('Phone', JSON.stringify(number))
                                    navigate('PhoneVerification', { verificationId: phoneAuthSnapshot.verificationId })
                                    break;
                                case auth.PhoneAuthState.ERROR: // or 'error'
                                    console.log(phoneAuthSnapshot.error.code)
                                    Alert.alert('Phone number is not correct')
                                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                                    break;
                                // case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
                                //     console.log('verify time out')
                                //     dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: number }, loading: !loading })
                                //     navigate('PhoneVerification', { verificationId: phoneAuthSnapshot.verificationId })
                                //     break;
                                case auth.PhoneAuthState.AUTO_VERIFIED: // or 'error'
                                    // console.log('verified', phoneAuthSnapshot)
                                    if (phoneAuthSnapshot.code == null && phoneAuthSnapshot.verificationId == null) {
                                        Alert.alert('Phone number is already in use');
                                        dispatch({ type: LOADING_SUCCESS, loading: !loading })
                                    }
                                    else {
                                        let userData = {
                                            phone: number,
                                            code: phoneAuthSnapshot.code,
                                            id: phoneAuthSnapshot.verificationId
                                        }
                                        dispatch(verifyCode(userData, navigate))
                                    }
                                    break;
                            }
                        }, (error) => {
                            console.log(error);
                        });
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            }).catch(error => { })
    };

};

const verifyCode = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        var credential = auth.PhoneAuthProvider.credential(userData.id, userData.code);
        if (credential) {
            console.log('User email: ', credential);
            auth().signInWithCredential(credential)
                .then((verify) => {
                    console.log("verify:", verify)
                    RegisterUser.verifyTheCode(userData)
                        .then(response => {
                            if (response.data.status) {
                                dispatch({ type: IS_USER_VERIFIED_SUCCESS, loading: !loading })
                                navigate('PhoneVerified');
                            }
                            else {
                                Alert.alert(response.data.message)
                                dispatch({ type: LOADING_SUCCESS, loading: !loading })
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                })
                .catch(error => {
                    console.log("error:", error.code)
                    if (error.code == "auth/invalid-verification-code") {
                        dispatch({ type: LOADING_SUCCESS, loading: !loading })
                        dispatch({ type: WRONG_CODE_ERROR, wrongCode: true })
                    }
                    else if (error.code == "auth/session-expired") {
                        dispatch({ type: LOADING_SUCCESS, loading: !loading })
                        dispatch({ type: EXPIRE_CODE_ERROR, codeExpire: true })
                    }

                })

        }
    }
};

const UpdateProfileInfo = (userData, phone, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.updatePersonalInfo(userData, phone)
            .then(response => {
                if (response.data.status) {
                    dispatch({
                        type: USER_UPDATE_PROFILE_INFO_SUCCESS, userData: {
                            name: userData.name,
                            gender: userData.gender,
                            dob: userData.dob,
                            photo: userData.image
                        },
                        loading: !loading
                    })
                    navigate('AddYourAddress', { editAddress: false });
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            }).catch(error => {
                console.log(error)
                dispatch({ type: LOADING_SUCCESS, loading: !loading })
            })
    }
};

const UpdateEmailAddressandToken = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.updateEmailAndPassword(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({
                        type: USER_EMAIL_AND_PASSWORD_SUCCESS,
                        email: userData.email,
                        password: userData.password,
                        loading: !loading
                    })
                    RegisterUser.userLogin(userData)
                        .then(async responseData => {
                            if (responseData.data.status) {
                                await requestUserPermission(responseData.data.userData[0], dispatch, navigate)
                                AsyncStorage.setItem('Email', JSON.stringify(userData))
                                // AsyncStorage.removeItem('Phone');
                                // dispatch({ type: USER_LOGIN_SUCCESS, userData: responseData.data.userData[0], loading: loading })
                                // dispatch(getUserProfile(responseData.data.userData[0], navigate))
                            }
                            else {
                                Alert.alert(response.data.message)
                                dispatch({ type: LOADING_SUCCESS, loading: !loading })
                            }
                        })
                        .catch(err => { console.log(err) })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            }).catch(error => {
                console.log(error)
            })
    }
};

const removeUser = (navigate, userData) => {
    return (dispatch) => {
        if (userData) {
            RegisterUser.removeFcmToken(userData)
                .then((res) => { console.log(res.data); navigate('Auth') })
                .catch((err) => { console.log(err); })
        }
        navigate('Auth')
        dispatch({ type: USER_LOGOUT_SUCCESS })
        AsyncStorage.removeItem('USER');
        AsyncStorage.removeItem('Email');


    }
};

const userLogin = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.userLogin(userData)
            .then(async (responseData) => {
                if (responseData.data.status) {
                    await requestUserPermission(responseData.data.userData[0], dispatch, navigate)

                    AsyncStorage.setItem('Email', JSON.stringify(userData))
                }
                else {
                    Alert.alert(responseData.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            })
            .catch(err => {
                console.log(err.message)
                dispatch({ type: LOADING_SUCCESS, loading: !loading })
            })
    }
};
const requestUserPermission = async function (data, dispatch, navigate) {
    const authorizationStatus = await messaging().requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        carPlay: true,
        provisional: true,
        sound: true,
    });
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
        console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
        console.log('User has provisional notification permissions.');
    } else {
        Alert.alert("Attension", "You need to allow push notification from settings",
            [
                { text: "OK", onPress: () => Linking.openSettings() }
            ])
        console.log('User has notification permissions disabled');
    }

    const authStatus = await messaging().hasPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        getFcmToken(data, dispatch, navigate);
    } else {
        console.log('Authorization status:', authStatus);
    }

}

const getFcmToken = async (userData, dispatch, navigate) => {
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
                    dispatch(getUserProfile(userData, navigate))
                }
            }).catch((err) => console.log(err))
    } else {
        console.log("Failed", "No token received");
    }
}
const healthAndSafety = (modal) => {
    return (dispatch) => {
        dispatch({ type: HEALTH_AND_SEFATY_SUCCESS, modal: modal })
    }
}
const wrongCode = (modal) => {
    return (dispatch) => {
        dispatch({ type: WRONG_CODE_ERROR, wrongCode: modal })
    }
}
const codeExpire = (modal) => {
    return (dispatch) => {
        dispatch({ type: EXPIRE_CODE_ERROR, codeExpire: modal })
    }
}
export const authActions = {
    setUserProfile,
    removeUser,
    setSocialNetworkUserData,
    sendVerificationCode,
    verifyCode,
    UpdateProfileInfo,
    UpdateEmailAddressandToken,
    getUserProfile,
    userLogin,
    healthAndSafety,
    codeExpire,
    wrongCode
};