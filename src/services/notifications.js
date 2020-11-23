import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from './Interceptor';
let configToken = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
}

const Api = {
    getAllNotifications: function (userData) {
        return axiosInstance.post('notification/viewAll', {
            user_id: userData.id
        }, configToken(userData.token))
    },

    readAllNotifications: function (userData) {
        return axiosInstance.post('notification/readAllNotifications', {
            user_id: userData.id
        }, configToken(userData.token))
    },

};

export default Api;