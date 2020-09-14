import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS,
    IS_USER_VERIFIED_SUCCESS,
    SEND_CODE_TO_USER_PHONENUMBER_SUCCESS,
    LOADING_SUCCESS,
    LOADING_END
} from '../types/auth';

const initialState = {
    isUserLogedIn: false,
    userData: {},
    userSocialNetworkData: {},
    isVerified: false,
    verificationCode: '',
    loading: false

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isUserLogedIn: true,
                userData: action.userData
            };
        case USER_LOGOUT_SUCCESS:
            return {
                initialState
            };
        case USER_SOCIALNETWORK_USERDATA_SUCCESS:
            return {
                ...state,
                userSocialNetworkData: action.userData
            }
        case IS_USER_VERIFIED_SUCCESS:
            return {
                ...state,
                isVerified: true,
                loading: action.loading
            }
        case SEND_CODE_TO_USER_PHONENUMBER_SUCCESS:
            return {
                ...state,
                verificationCode: action.verificationCode,
                loading: false
            }
        case LOADING_SUCCESS:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
};

export default authReducer;
