
import axiosInstance from './Interceptor';

const Api = {
    getBarbersList: function (userData) {
        return axiosInstance.post('list/searchBarbers', {
            id: userData.id,
            type: 'barber'
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },

    getBarbersListSelectedService: function (userData) {
        return axiosInstance.post('list/barbers', {
            id: userData.id,
            type: 'barber',
            service_id: userData.service_id
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },
    getBarberProfile: function (userData) {
        return axiosInstance.post('list/barberProfile', {
            id: userData.id,
            barber_id: userData.barber_id
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },
    getBarberServices: function (userData) {
        console.log(userData)
        return axiosInstance.post('list/barberServices', {
            id: userData.id,
            barber_id: userData.barber_id
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
    },
    getBarberBooking: function (userData) {
        console.log(userData)
        return axiosInstance.post('list/barberBooking', {
            id: userData.id,
            barber_id: userData.barber_id,
            current_date: userData.current_date,
            day: userData.day,
            slot_difference: userData.slot_difference
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