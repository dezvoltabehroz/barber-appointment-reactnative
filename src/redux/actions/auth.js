import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
} from '../types/auth'

const setUser = (payload) => {
    return ({
        type: USER_LOGIN_SUCCESS,
        payload
    })
};

const removeUser = () => {
    return ({
        type: USER_LOGOUT_SUCCESS,
    })
}

export const actions = {
    setUser,
    removeUser
};