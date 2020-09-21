import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json' } }

const Api = {
    getCategories: function (userData) {
        return axiosInstance.post('services/getAllCategories', {
            id: userData.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },

    getSubCategories: function (userData) {
        return axiosInstance.post('services/getAllSubCategories', {
          id:userData.id,
          cat_id:userData.cat.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },

    getServices: function (userData) {
        return axiosInstance.post('services/getAllServices', {
           id:userData.id,
           sub_cat_id:userData.cat.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },

};

export default Api;