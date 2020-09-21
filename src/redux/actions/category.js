import {
    CATEGORIES_SUCCESS,
    SERVICES_SUCCESS,
    SUB_CATEGORIES_SUCCESS,
    LOADING_CATEGORIES_SUCCESS
} from '../types';
import { Categories } from '../../services';
import { Alert } from 'react-native';


const getCategories = (userData) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: loading })
        }
        Categories.getCategories(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: CATEGORIES_SUCCESS, categories: response.data.categories, loading: !loading })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: !loading })
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: !loading })
            })
    };
}

const getSubCategories = (userData, navigate) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: loading })
        }
        Categories.getSubCategories(userData)
            .then((response) => {
                if (response.data.status) {
                    dispatch({ type: SUB_CATEGORIES_SUCCESS, subCategories: response.data.subCategories, loading: !loading })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: !loading })
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: !loading })
            })
    };
}

const getServices = (userData) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: loading })
        }
        Categories.getServices(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: SERVICES_SUCCESS, services: response.data.services, loading: !loading })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: !loading })
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                dispatch({ type: LOADING_CATEGORIES_SUCCESS, loading: !loading })
            })
    };
}


export const categoryActions = {
    getCategories,
    getSubCategories,
    getServices,

};