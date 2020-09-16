import {
    USER_ADD_NEW_ADDRESS_SUCCESS,
    LOADING_SUCCESS
} from '../types';

const initialState = {
    userAddresses: [],
    newAddress: {},
    personalAddress:'',
    loading: false

};

const userAddresses = (state = initialState, action) => {
    switch (action.type) {
        case USER_ADD_NEW_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                personalAddress: action.personalAddress
            };
        case LOADING_SUCCESS:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
};

export default userAddresses;
