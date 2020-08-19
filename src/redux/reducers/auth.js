import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS
} from '../types/auth';

const initialState = {
    isUserLogedIn: false,
    userData: {},
    userSocialNetworkData: {},

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
        default:
            return state;
    }
};

export default authReducer;
