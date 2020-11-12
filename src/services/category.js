import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', } }

const Api = {
    getCategories: function () {
        return axiosInstance.get('services/getAllCategories', {
        }, config)
    },

    getSubCategories: function (userData) {
        return axiosInstance.post('services/getAllSubCategories', {
            cat_id: userData.cat.id
        }, config)
    },

    getServices: function (userData) {
        return axiosInstance.post('services/getAllServices', {
            sub_cat_id: userData.cat.id
        }, config)
    },
    getAllVendorServices: function () {
        return axiosInstance.post('services/listAllServices')
    }

};

export default Api;