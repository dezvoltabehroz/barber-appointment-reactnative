import {
    USER_ADD_NEW_ADDRESS_SUCCESS,
    LOADING_SUCCESS
} from '../types';
import { UserAddresses } from '../../services';
import { Alert } from 'react-native';


export const addPresonalAddress = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_SUCCESS, loading: loading })
        }
        UserAddresses.addYourAddress(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: USER_ADD_NEW_ADDRESS_SUCCESS, personalAddress: userData.address, loading: !loading })
                    navigate('EmailandPassword')
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_SUCCESS, loading: !loading })
                }
            })
            .catch(error => { console.log(JSON.stringify(error)) })
    };
}

export const userAddressActions = {
    addPresonalAddress,

};