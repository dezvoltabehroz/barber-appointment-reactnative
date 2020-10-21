import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json' } }
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
    addYourAddress: function (userData) {
        return axiosInstance.post('registration/updatePersonalAddress', {
            lat: userData.lat,
            lng: userData.lng,
            address: userData.address,
            floor_unit: userData.floor_unit,
            additional_info: userData.additional_info,
            label_as: userData.label_as,
            phone: userData.phone
            // phone:'+923123680434'
        }, config)
    },

    addNewAddress: function (userData) {
        return axiosInstance.post('address/addNewAddress', {
            lat: userData.lat,
            lng: userData.lng,
            address: userData.address,
            floor_unit: userData.floor_unit,
            additional_info: userData.additional_info,
            label_as: userData.label_as,
            id: userData.id
        },configToken(userData.token))
    },

    viewAllAddresses: function (userData) {
        return axiosInstance.post('address/viewAllAddress', {
            id: `${userData.id}`,
        },configToken(userData.token))
    },

    editAddress: function (userData) {
        return axiosInstance.put('address/updateAddress', {
            lat: userData.lat,
            lng: userData.lng,
            address: userData.address,
            floor_unit: userData.floor_unit,
            additional_info: userData.additional_info,
            label_as: userData.label_as,
            id: userData.id,
            address_id: userData.address_id
        },configToken(userData.token))
    },

    deleteAddress: function (userData) {
        return axiosInstance.post('address/deleteAddress', {
            id: userData.user_id,
            address_id: userData.id
        },configToken(userData.token))
    },

    changeDefaultAddress: function (userData) {
        return axiosInstance.post('address/changeDefaultAddress', {
            id: userData.user_id,
            address_id: userData.id
        },configToken(userData.token))
    }

};

export default Api;