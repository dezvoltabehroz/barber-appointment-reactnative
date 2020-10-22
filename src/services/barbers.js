
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
    getBarbersList: function (userData) {
        return axiosInstance.post('list/searchBarbers', {
            id: userData.id,
            type: 'barber'
        },configToken(userData.token))
    },

    getBarbersListSelectedService: function (userData) {
        return axiosInstance.post('list/barbers', {
            id: userData.id,
            type: 'barber',
            service_id: userData.service_id
        },configToken(userData.token))
    },
    getBarberProfile: function (userData) {
        return axiosInstance.post('list/barberProfile', {
            id: userData.id,
            barber_id: userData.barber_id
        },configToken(userData.token))
    },
    getBarberServices: function (userData) {
        return axiosInstance.post('list/barberServices', {
            id: userData.id,
            barber_id: userData.barber_id
        }, configToken(userData.token))
    },
    getBarberBooking: function (userData) {
        return axiosInstance.post('list/barberBooking', {
            id: userData.id,
            barber_id: userData.barber_id,
            current_date: userData.current_date,
            day: userData.day,
            slot_difference: userData.slot_difference
        }, configToken(userData.token))
    },

};

export default Api;