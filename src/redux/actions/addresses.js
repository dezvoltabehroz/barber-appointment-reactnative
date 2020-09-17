import {
    USER_ADD_NEW_ADDRESS_SUCCESS,
    LOADING_ADDRESSES_SUCCESS,
    USER_ALL_ADDRESS_SUCCESS,
    USER_ADD_ADDRESS_SUCCESS
} from '../types';
import { UserAddresses } from '../../services';
import { Alert } from 'react-native';


const addPresonalAddress = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: loading })
        }
        UserAddresses.addYourAddress(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: USER_ADD_ADDRESS_SUCCESS, personalAddress: userData.address, loading: !loading })
                    navigate('EmailandPassword')
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: !loading })
                }
            })
            .catch(error => { console.log(JSON.stringify(error)) })
    };
}

const addNewAddress = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: loading })
        }
        UserAddresses.addNewAddress(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: USER_ADD_NEW_ADDRESS_SUCCESS, loading: !loading })
                    navigate('Home')
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: !loading })
                }
            })
            .catch(error => { console.log(JSON.stringify(error)) })
    };
}

const allAddresses = (userData) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: loading })
        }
        UserAddresses.viewAllAddresses(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: USER_ALL_ADDRESS_SUCCESS, addresses: response.data.addresses, loading: !loading })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: !loading })
                }
            })
            .catch(error => { console.log(JSON.stringify(error)) })
    }
}

export const userAddressActions = {
    addPresonalAddress,
    allAddresses,
    addNewAddress
};