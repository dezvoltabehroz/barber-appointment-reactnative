import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    LOADING_SUCCESS,
    USER_UPDATE_PROFILE_INFO_SUCCESS,
    USER_EMAIL_AND_PASSWORD_SUCCESS,
    USER_ALL_ADDRESS_SUCCESS,
    LOADING_ADDRESSES_SUCCESS
} from '../types';
import { RegisterUser } from '../../services';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { categoryActions } from './category';
import { userAddressActions } from './addresses';
import auth from '@react-native-firebase/auth';

const setUserProfile = (userData) => {
    return (dispatch) => {
        if (userData) {
            dispatch({ type: USER_LOGIN_SUCCESS, userData: userData, })
            if (userData.type == 'customer') {
                // dispatch(userAddressActions.allAddresses(userData));
                dispatch(categoryActions.getCategories(userData));
            }
        }
    }
};

const getUserProfile = (userData, navigate) => {
    console.log(navigate)
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.getUserProfile(userData)
            .then((responseData) => {
                if (responseData.data.success != 'undefined' && responseData.data.success == false) {
                    dispatch(removeUser(navigate));
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
                else {
                    if (responseData.data.status) {
                        dispatch(setUserProfile(responseData.data.userData[0]))
                        AsyncStorage.setItem('USER', JSON.stringify(responseData.data.userData[0]))
                        if (navigate) {
                            if (responseData.data.userData[0].type == "customer") {
                                navigate('Customer', { screen: 'Home' });
                            }
                            else {
                                navigate('Barber');
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
            }).catch(error => {
                //         console.log(JSON.stringify(error))
            })
        // auth().verifyPhoneNumber(number, 60)
        //     .on('state_changed', (phoneAuthSnapshot) => {
        //         switch (phoneAuthSnapshot.state) {
        //             case auth.PhoneAuthState.CODE_SENT:
        //                 console.log('code sent')
        //                 RegisterUser.sendCodeToPhoneNumber(number)
        //                     .then(response => {
        //                         console.log(response.data)
        //                         if (response.data.status) {
        //                             dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: number }, loading: !loading })
        //                             navigate('PhoneVerification', { verificationId: phoneAuthSnapshot.verificationId })
        //                         }
        //                         else {
        //                             Alert.alert(response.data.message)
        //                             dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //                         }
        //                     }).catch(error => {
        //                         console.log(JSON.stringify(error))
        //                     })
        //                 break;
        //             case auth.PhoneAuthState.ERROR: // or 'error'
        //                 console.log(phoneAuthSnapshot.error.code)
        //                 Alert.alert('Phone number is not correct')
        //                 dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //                 break;
        //             case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
        //                 console.log('verify time out')
        //                 dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: number }, loading: !loading })
        //                 navigate('PhoneVerification', { verificationId: phoneAuthSnapshot.verificationId })
        //                 break;
        //             case auth.PhoneAuthState.AUTO_VERIFIED: // or 'error'
        //                 console.log('verified', phoneAuthSnapshot)
        //                 if (phoneAuthSnapshot.code == null && phoneAuthSnapshot.verificationId == null) {
        //                     Alert.alert('Phone number is already in use');
        //                     dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //                 }
        //                 else {
        //                     let userData = {
        //                         phone: number,
        //                         code: phoneAuthSnapshot.code,
        //                         id: phoneAuthSnapshot.verificationId
        //                     }
        //                     dispatch(verifyCode(userData, navigate))
        //                 }

        //                 break;
        //         }
        //     }, (error) => {
        //         console.log(error);
        //     });


        // RegisterUser.sendCodeToPhoneNumber(number)
        //     .then(response => {
        //         console.log(response)
        //         if (response.code !== null) {
        //             Alert.alert('Phone number is not correct')
        //             dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //         } else {
        //             if (response.verificationId == null) {
        //                 Alert.alert('Phonenumber is already verified')
        //                 dispatch({ type: LOADING_SUCCESS, loading: !loading })
        //             }
        //             else {
        //                 dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: number }, loading: !loading })
        //                 navigate('PhoneVerification')
        //             }
        //         }
        //     }).catch(error => {
        //         console.log(JSON.stringify(error))
        //     })
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
        }
    }
};

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
                    navigate('AddYourAddress', { editAddress: false });
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
                                AsyncStorage.removeItem('Phone');
                                dispatch({ type: USER_LOGIN_SUCCESS, userData: responseData.data.userData[0], loading: loading })
                                dispatch(getUserProfile(responseData.data.userData[0], navigate))
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

const removeUser = (navigate) => {
    return (dispatch) => {
        dispatch({ type: USER_LOGOUT_SUCCESS })
        AsyncStorage.removeItem('USER');
        navigate('Auth')
    }
};

const userLogin = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        RegisterUser.userLogin(userData)
            .then(responseData => {
                if (responseData.data.status) {
                    dispatch(getUserProfile(responseData.data.userData[0], navigate))
                    AsyncStorage.setItem('Email', JSON.stringify(userData))
                }
                else {
                    Alert.alert(responseData.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            })
            .catch(err => { console.log(err) })
    }
};

export const authActions = {
    setUserProfile,
    removeUser,
    setSocialNetworkUserData,
    sendVerificationCode,
    verifyCode,
    UpdateProfileInfo,
    UpdateEmailAddressandToken,
    getUserProfile,
    userLogin
};