import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    LOADING_SUCCESS,
    USER_UPDATE_PROFILE_INFO_SUCCESS,
    USER_EMAIL_AND_PASSWORD_SUCCESS
} from '../types';
import { RegisterUser } from '../../services';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const setUser = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.userLogin(userData)
            .then((responseData) => {
                if (responseData.data.status) {
                    dispatch({
                        type: USER_LOGIN_SUCCESS, userData: responseData.data.userData[0], loading: !loading
                    })
                    AsyncStorage.setItem('USER_DATA',JSON.stringify( responseData.data.userData[0]))
                    navigate('Customer', { screen: 'Home' });
                }
                else {
                    Alert.alert(responseData.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            })
            .catch(err => { console.log(err) })

    }
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
                if (!response.data.success && response.data.message.status === 400) {
                    Alert.alert('Phone number is not correct')
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
                else {
                    if (response.data.status) {
                        dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: number }, loading: !loading })
                        navigate('PhoneVerification')
                    }
                    else {
                        Alert.alert(response.data.message)
                        dispatch({ type: LOADING_SUCCESS, loading: !loading })
                    }
                }
            }).catch(error => {
                console.log(JSON.stringify(error))
            })
    };

}


const verifyCode = (code, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.verifyTheCode(code)
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
    }
}


const UpdateProfileInfo = (userData, phone, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.updateProfileInfo(userData, phone)
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
                    navigate('AddYourAddress');
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            }).catch(error => {
                console.log(error)
            })
    }
}

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
                        .then(responseData => {
                            if (responseData.data.status) {
                                dispatch({
                                    type: USER_LOGIN_SUCCESS, userData: responseData.data.userData, loading: !loading
                                })
                                AsyncStorage.setItem('USER_DATA', responseData.data.userData)
                                navigate('Customer', { screen: 'Home' });
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
}

const removeUser = (navigate) => {
    return (dispatch) => {
        dispatch({ type: USER_LOGOUT_SUCCESS })
        AsyncStorage.removeItem('USER_DATA');
        navigate('Auth')
    }
}

export const authActions = {
    setUser,
    removeUser,
    setSocialNetworkUserData,
    sendVerificationCode,
    verifyCode,
    UpdateProfileInfo,
    UpdateEmailAddressandToken
};