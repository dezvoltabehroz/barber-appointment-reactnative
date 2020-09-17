import {
    USER_ADD_NEW_ADDRESS_SUCCESS,
    LOADING_ADDRESSES_SUCCESS,
    USER_ALL_ADDRESS_SUCCESS,
    USER_ADD_ADDRESS_SUCCESS

} from '../types';

const initialState = {
    addresses: [],
    personalAddress: '',
    loading: false

};

const userAddresses = (state = initialState, action) => {
    switch (action.type) {
        case USER_ADD_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                personalAddress: action.addresses
            };
        case USER_ALL_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                addresses: action.addresses
            };
        case USER_ADD_NEW_ADDRESS_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                addresses: action.addresses
            };
        case LOADING_ADDRESSES_SUCCESS:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
};

export default userAddresses;
