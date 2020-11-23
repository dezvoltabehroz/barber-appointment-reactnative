import {
    GET_NOTIFICATIONS,
    LOADING_NOTIFICATIONS_SUCCESS
} from '../types';
import { Notifications } from '../../services';
import { Alert } from 'react-native';


const getNotification = (userData) => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_NOTIFICATIONS_SUCCESS, loading: loading })
        }
        Notifications.getAllNotifications(userData)
            .then(response => {
                if (response.data.status) {
                    dispatch({ type: GET_NOTIFICATIONS, notifications: response.data.addresses, notificationCount:response.data.notificationCount, loading: !loading })
                }
                else {
                    Alert.alert(response.data.message)
                    dispatch({ type: LOADING_NOTIFICATIONS_SUCCESS, loading: !loading })
                }
            })
            .catch(error => {
                console.log(JSON.stringify(error))
                dispatch({ type: LOADING_NOTIFICATIONS_SUCCESS, loading: !loading })
            })
    };
}

const loading = () => {
    return (dispatch) => {
        let loading = true;
        if (loading) {
            dispatch({ type: LOADING_NOTIFICATIONS_SUCCESS, loading: loading })
        }
    }
}



export const notificationActions = {
    getNotification,
    loading
};