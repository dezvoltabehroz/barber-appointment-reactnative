import {
    BARBERS_LIST_SUCCESS,
    LOADING_BARBERS_SUCCESS
} from '../types';
import { Barbers } from '../../services';
import { Alert } from 'react-native';


const getBarbersList = (userData) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_BARBERS_SUCCESS, loading: loading })
        }
        Barbers.getBarbersList(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: BARBERS_LIST_SUCCESS, barberList: response.data.barber_list, loading: !loading })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_BARBERS_SUCCESS, loading: !loading })
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                dispatch({ type: LOADING_BARBERS_SUCCESS, loading: !loading })
            })
    };
}


export const barberActions = {
    getBarbersList,
};