import axiosInstance from './Interceptor';
import axios from 'axios';
let config = { headers: { 'Content-Type': 'application/json' } }
const Api = {
    sendCodeToPhoneNumber: function (number) {
        return axiosInstance.post('registration/regPhoneNumber', {
            phone: `${number}`,
            type: "customer"
        }, config)
    },

    verifyTheCode: function (code) {
        return axiosInstance.post('registration/verifyCode', {
            code: `${code}`
        }, config)
    },

    updateProfileInfo: function (userData, phone) {
        let formData = new FormData();
        formData.append('full_name', userData.name);
        formData.append('gender', userData.gender);
        formData.append('dob', userData.dob);
        formData.append('phone', phone);
        // formData.append('image', {
        //     name: userData.image.fileName,
        //     uri: userData.image.path,
        //     type: userData.image.type
        // });
        console.log(formData)
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post("http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/registration/updatePersonalInfo", formData, config);
    },

    updateEmailAndPassword: function (userData) {
        return axiosInstance.post('registration/updateEmailAndPassword', {
            email: userData.email,
            password: userData.password,
            macAddress: userData.macAddress,
            phone: userData.phone
        }, config)
    },

    getUserProfile: function (userData) {
        return axiosInstance.post('registration/profileDetail', {
            id: userData.id,
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },

    userLogin: function (userData) {
        return axiosInstance.post('registration/login', {
            email: userData.email,
            password: userData.password,
        }, config)
    },
};

export default Api;