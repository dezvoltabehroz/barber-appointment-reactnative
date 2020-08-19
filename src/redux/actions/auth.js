import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    USER_SOCIALNETWORK_USERDATA_SUCCESS

} from '../types/auth';

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

const removeUser = () => {
    return ({
        type: USER_LOGOUT_SUCCESS,
    })
}

export const authActions = {
    setUser,
    removeUser,
    setSocialNetworkUserData
};