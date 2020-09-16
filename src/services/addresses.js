import axiosInstance from './Interceptor';
let headers = { 'Content-Type': 'application/json' }
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
        }, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },
    addressList: function (userId) {
        return axiosInstance.post('', {
            userId: `${userId}`,
        }, headers)
    },
    editAddress: function (address) {
        return axiosInstance.put('', {
            address: `${address}`,
        }, headers)
    },
    deleteAddress: function (address) {
        return axiosInstance.post('', {
            address: `${address}`,
        }, headers)
    }
};

export default Api;