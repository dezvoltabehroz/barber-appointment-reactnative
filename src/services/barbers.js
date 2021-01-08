
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
        formData.append('image', userData.image.uri ? {
            uri: Platform.OS === 'android' ? 'file://' + userData.image.path : userData.image.uri,
            name: `${new Date().getTime().toString()}.jpg`,
            filename: new Date().getTime().toString() + '.jpg',
            type: 'image/jpg'
        } : userData.image);

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/barber/updatePersonalInfo', formData, config)
    },
    uploadBarberPortfolio: function (userData) {
        let formData = new FormData();
        formData.append('user_id', userData.id);
        userData.images.forEach(element => {
            formData.append('images', {
                uri: element.path,
                name: `${new Date().getTime().toString()}.jpg`,
                filename: new Date().getTime().toString() + '.jpg',
                type: 'image/jpg'
            });
        });
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/barber/uploadPortfolio', formData, config)

    },
    uploadBarberCertificates: function (userData) {
        let formData = new FormData();
        formData.append('user_id', userData.id);
        userData.images.forEach(element => {
            formData.append('images', {
                uri: element.path,
                name: `${new Date().getTime().toString()}.jpg`,
                filename: new Date().getTime().toString() + '.jpg',
                type: 'image/jpg'
            });
        });
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/barber/uploadCertificates', formData, config)

    },
    uploadBarberResumes: function (userData) {
        let formData = new FormData();
        formData.append('user_id', userData.id);
        userData.images.forEach(element => {
            formData.append('images', {
                uri: element.path,
                name: `${new Date().getTime().toString()}.jpg`,
                filename: new Date().getTime().toString() + '.jpg',
                type: 'image/jpg'
            });
        });
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/barber/uploadResume', formData, config)

    },
    uploadBarberDrivingLicence: function (userData) {
        let formData = new FormData();
        formData.append('user_id', userData.id);
        userData.images.forEach(element => {
            formData.append('images', {
                uri: element.path,
                name: `${new Date().getTime().toString()}.jpg`,
                filename: new Date().getTime().toString() + '.jpg',
                type: 'image/jpg'
            });
        });
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/barber/uploadDrivingLicense', formData, config)

    },
    uploadBarberPassport: function (userData) {
        let formData = new FormData();
        formData.append('user_id', userData.id);
        userData.images.forEach(element => {
            formData.append('images', {
                uri: element.path,
                name: `${new Date().getTime().toString()}.jpg`,
                filename: new Date().getTime().toString() + '.jpg',
                type: 'image/jpg'
            });
        });
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post('http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/barber/uploadPassport', formData, config)

    },
    getBarberAllPortfolio: function (userData) {
        return axiosInstance.post('barber/viewAllPortfolio', {
            user_id: userData.id,
        }, configToken(userData.token))
    },
    deleteSelectedPortfolio: function (userData) {
        return axiosInstance.post('barber/deletePortfolio', {
            user_id: userData.id,
            attachment_id: userData.attachment_id
        }, configToken(userData.token))
    },
    getBarberAllCertificates: function (userData) {
        return axiosInstance.post('barber/viewAllCertificates', {
            user_id: userData.id,
        }, configToken(userData.token))
    },
    deleteSelectedCertificates: function (userData) {
        return axiosInstance.post('barber/deleteCertificates', {
            user_id: userData.id,
            attachment_id: userData.attachment_id
        }, configToken(userData.token))
    },
    getBarberAllResumes: function (userData) {
        return axiosInstance.post('barber/viewAllResume', {
            user_id: userData.id,
        }, configToken(userData.token))
    },
    deleteSelectedResumes: function (userData) {
        return axiosInstance.post('barber/deleteResume', {
            user_id: userData.id,
            attachment_id: userData.attachment_id
        }, configToken(userData.token))
    },
    getBarberAllPassportAndLicence: function (userData) {
        return axiosInstance.post('barber/viewAllPassportAndLicence', {
            user_id: userData.id,
        }, configToken(userData.token))
    },
    deleteSelectedPassportAndLicence: function (userData) {
        return axiosInstance.post('barber/deletePassportAndLicence', {
            user_id: userData.id,
            attachment_id: userData.attachment_id
        }, configToken(userData.token))
    },
    getBarberAllServices: function (userData) {
        return axiosInstance.post('barber/viewAllBarberServices', {
            user_id: userData.id,
        }, configToken(userData.token))
    },
    deleteBarberService: function (userData) {
        return axiosInstance.post('barber/deleteBarberService', {
            user_id: userData.id,
            service_id: userData.service_id
        }, configToken(userData.token))
    },
    updateBarberService: function (userData) {
        return axiosInstance.post('barber/updateBarberService', {
            user_id: userData.id,
            service_id: userData.service_id,
            price: userData.price,
            time_duration: userData.time_duration
        }, configToken(userData.token))
    },
    addServiceAcrossBarber: function (userData) {
        return axiosInstance.post('barber/addServiceAcrossBarber', {
            user_id: userData.id,
            services_data: userData.services,
        }, configToken(userData.token))
    },
    addBarberServices: function (userData) {
        return axiosInstance.post('barber/addBarberServices', {
            user_id: userData.id,
            services: userData.services,
        }, configToken(userData.token))
    },
    getBarberSelectedServices: function (userData) {
        return axiosInstance.post('barber/getBarberSelectedService', {
            user_id: userData.id,
        }, configToken(userData.token))
    },
    updatePriceAndDuration: function (userData) {
        return axiosInstance.post('barber/updatePriceAndDuration', {
            user_id: userData.id,
            services: userData.services
        }, configToken(userData.token))
    },
    addBarberWorkingDays: function (userData) {
        return axiosInstance.post('barber/updateWorkingDays', {
            user_id: userData.id,
            working_days: userData.working_days
        }, configToken(userData.token))
    },
    getBarberWorkingDays: function (userData) {
        return axiosInstance.post('barber/getWorkingDays', {
            user_id: userData.id,
        }, configToken(userData.token))
    },
    updateWorkingDaysTime: function (userData) {
        return axiosInstance.post('barber/updateWorkingDaysTime', {
            user_id: userData.id,
            working_days: userData.working_days
        }, configToken(userData.token))
    },
    deleteBarberWorkingDay: function (userData) {
        return axiosInstance.post('barber/deleteBarberWorkingDays', {
            user_id: userData.id,
            schedule_id: userData.schedule_id
        }, configToken(userData.token))
    },
    viewBarberWorkingDays: function (userData) {
        return axiosInstance.post('barber/viewBarberWorkingDays', {
            id: userData.id,
        }, configToken(userData.token))
    },
    updateBarberWorkingDays: function (userData) {
        return axiosInstance.post('barber/updateBarberWorkingDays', {
            id: userData.id,
            working_schedule: userData.working_schedule
        }, configToken(userData.token))
    },
    viewBarberBreaks: function (userData) {
        return axiosInstance.post('barber/viewBarberBreaks', {
            id: userData.id,
        }, configToken(userData.token))
    },
    deleteBreakTime: function (userData) {
        return axiosInstance.post('barber/deleteBreakTime', {
            id: userData.id,
            day_id: userData.day_id
        }, configToken(userData.token))

    },
    viewBarberNoBreakDays: function (userData) {
        return axiosInstance.post('barber/viewBarberNoBreakDays', {
            id: userData.id,
        }, configToken(userData.token))

    },
    addBreakTime: function (userData) {
        return axiosInstance.post('barber/addBreakTime', {
            id: userData.id,
            day_id: userData.day_id,
            break_start_time: userData.break_start_time,
            break_end_time: userData.break_end_time
        }, configToken(userData.token))
    },
    addBarberOffDay: function (userData) {
        return axiosInstance.post('barber/addBarberOffDay', {
            id: userData.id,
            off_date: userData.off_date,
            off_reason: userData.off_reason
        }, configToken(userData.token))
    },
    viewListBarberOffDay: function (userData) {
        return axiosInstance.post('barber/viewListBarberOffDay', {
            id: userData.id
        }, configToken(userData.token))
    },
    deleteBarberOffDay: function (userData) {
        return axiosInstance.post('barber/deleteBarberOffDay', {
            id: userData.id,
            off_day_id: userData.off_day_id
        }, configToken(userData.token))
    }

};

export default Api;