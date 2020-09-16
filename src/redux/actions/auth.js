import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    LOADING_SUCCESS,
    USER_UPDATE_PROFILE_INFO_SUCCESS
} from '../types/auth';
import { RegisterUser } from '../../services';
import { Alert } from 'react-native';

const setUser = (userData) => {
    return ({
        type: USER_LOGIN_SUCCESS,
        userData
    })
};

const setSocialNetworkUserData = (userData) => {
    return ({
        type: USER_SOCIALNETWORK_USERDATA_SUCCESS,
        userData
    })
};

export const sendVerificationCode = (number, navigate) => {
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
                        dispatch({ type: SEND_CODE_TO_USER_PHONENUMBER_SUCCESS, userData: { phone: response.data.phone }, loading: !loading })
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
                    console.log(response.data)
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
                    console.log(response.data)
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            }).catch(error => {
                console.log(error)
            })
    }
}

const removeUser = () => {
    return ({
        type: USER_LOGOUT_SUCCESS,
    })
}

export const authActions = {
    setUser,
    removeUser,
    setSocialNetworkUserData,
    sendVerificationCode,
    verifyCode,
    UpdateProfileInfo,
};