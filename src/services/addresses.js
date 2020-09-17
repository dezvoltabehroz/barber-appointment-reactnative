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
    // editAddress: function (address) {
    //     return axiosInstance.put('', {
    //         address: `${address}`,
    //     }, headers)
    // },
    // deleteAddress: function (address) {
    //     return axiosInstance.delete('', {
    //         address: `${address}`,
    //     }, headers)
    // }
};

export default Api;