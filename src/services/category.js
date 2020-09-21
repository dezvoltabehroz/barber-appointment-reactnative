import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json' } }

const Api = {
    getCategories: function () {
        return axiosInstance.get('services/getAllCategories', {
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },

    getSubCategories: function (userData) {
        return axiosInstance.post('services/getAllSubCategories', {
          cat_id:userData.cat.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },

    getServices: function (userData) {
        return axiosInstance.post('services/getAllServices', {
           sub_cat_id:userData.cat.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },

};

export default Api;