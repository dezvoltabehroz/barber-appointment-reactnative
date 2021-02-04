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
    getAllListScheduler: function (userData) {
        return axiosInstance.post('scheduler/listScheduler', {
            id: userData.id
        }, configToken(userData.token))
    },

    deleteScheduler: function (userData) {
        return axiosInstance.post('scheduler/deleteScheduler', {
            id: userData.id,
            scheduler_id: userData.scheduler_id
        }, configToken(userData.token))
    },
    createScheduler: function (userData) {
        console.log("userData:", userData)
        return axiosInstance.post('scheduler/createScheduler', {
            id: userData.id,
            scheduler_name: userData.scheduler_name,
            working_days: userData.working_days
        }, configToken(userData.token))
    },
    schedulerDetail: function (userData) {
        return axiosInstance.post('scheduler/schedulerDetail', {
            id: userData.id,
            scheduler_id: userData.scheduler_id
        }, configToken(userData.token))
    },

};

export default Api;