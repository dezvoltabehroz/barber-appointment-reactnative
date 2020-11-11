
import axiosInstance from './Interceptor';
import axios from 'axios';
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
        }, configToken(userData.token))
    },

    getBarbersListSelectedService: function (userData) {
        return axiosInstance.post('list/barbers', {
            id: userData.id,
            type: 'barber',
            service_id: userData.service_id
        }, configToken(userData.token))
    },
    getBarberProfile: function (userData) {
        return axiosInstance.post('list/barberProfile', {
            id: userData.id,
            barber_id: userData.barber_id
        }, configToken(userData.token))
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
    updateBarberPersonalInfo: function (userData) {
        let formData = new FormData();
        formData.append('full_name', userData.name);
        formData.append('max_distance_radius', userData.max_distance_radius);
        formData.append('latitude', userData.latitude);
        formData.append('longitude', userData.longitude);
        formData.append('barber_title', 'barber');
        formData.append('gender', userData.gender);
        formData.append('dob', userData.dob);
        formData.append('phone', userData.phone ? userData.phone : phone);
        formData.append('image', userData.image ? {
            uri: Platform.OS === 'android' ? 'file://' + userData.image.path : userData.image.uri,
            name: `${new Date().getTime().toString()}.jpg`,
            filename: new Date().getTime().toString() + '.jpg',
            type: 'image/jpg'
        } : '');

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/barber/updatePersonalInfo', formData, config)
    }

};

export default Api;