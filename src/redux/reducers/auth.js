import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
} from '../types/auth';

const initialState = {
    isUserLogedIn: false,
    userData: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isUserLogedIn: true,
                userData: action.payload
            };
        case USER_LOGOUT_SUCCESS:
            return {
                initialState
            };
        default:
            return state;
    }
};

export default authReducer;
