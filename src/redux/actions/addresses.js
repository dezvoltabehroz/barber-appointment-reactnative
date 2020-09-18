import {
    USER_ADD_NEW_ADDRESS_SUCCESS,
    LOADING_ADDRESSES_SUCCESS,
    USER_ALL_ADDRESS_SUCCESS,
    USER_ADD_ADDRESS_SUCCESS,
    DELETE_ADDRESS_SUCESS,
    USER_EDIT_ADDRESS_SUCCESS
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

const editAddress = (userData, navigate) => {
    console.log('redux====>',userData)
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: loading })
        }
        UserAddresses.editAddress(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: USER_EDIT_ADDRESS_SUCCESS, loading: !loading })
                    navigate('MyAddresses')
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
const deleteAddress = (userData) => {
    console.log("redux=====>",userData)
    return (dispatch,store) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: loading })
        }
        UserAddresses.deleteAddress(userData)
            .then(response => {
                console.log(response)
                console.log(response.data)
                if (response.data.status) {
                    dispatch({ type: DELETE_ADDRESS_SUCESS,addresses:store().userAddresses.addresses.filter((obj => obj.id != userData.id)), loading: !loading })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: !loading })
                }
            })
            .catch(error => { console.log(JSON.stringify(error))
                dispatch({ type: LOADING_ADDRESSES_SUCCESS, loading: !loading }) })
    }
}

export const userAddressActions = {
    addPresonalAddress,
    allAddresses,
    addNewAddress,
    deleteAddress,
    editAddress
};