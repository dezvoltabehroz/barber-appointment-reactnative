import AsyncStorage from '@react-native-community/async-storage';
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json' } }

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
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },

    viewAllAddresses: function (userData) {
        return axiosInstance.post('address/viewAllAddress', {
            id: `${userData.id}`,
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
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
        }, {
            headers: {
                'Authorization': 'Bearer ' + `${userData.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },

    deleteAddress: function (userData) {
        return axiosInstance.post('address/deleteAddress', {
            id: userData.user_id,
            address_id: userData.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + `${userData.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },
    
    changeDefaultAddress:function(userData){
        return axiosInstance.post('address/changeDefaultAddress',{
            id: userData.user_id,
            address_id: userData.id
        }, {
            headers: {
                'Authorization': 'Bearer ' + `${userData.token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

};

export default Api;