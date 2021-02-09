import axiosInstance from './Interceptor';
import axios from 'axios';
import { Platform } from 'react-native';
let config = { headers: { 'Content-Type': 'application/json' } }
const Api = {
    sendCodeToPhoneNumber: function (number) {
        return axiosInstance.post('registration/regPhoneNumber', {
            phone: `${number}`,
            type: "customer"
        }, config)
    },

    verifyTheCode: function (userData) {
        return axiosInstance.post('registration/verifyCode', {
            phone: `${userData.phone}`
        }, config)
    },

    updateProfileInfo: function (userData, phone) {
        let formData = new FormData();
        formData.append('full_name', userData.name);
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
        return axios.post("http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/registration/updatePersonalInfo", formData, config);
    },

    updateEmailAndPassword: function (userData) {
        return axiosInstance.post('registration/updateEmailAndPassword', {
            email: userData.email,
            password: userData.password,
            macAddress: userData.macAddress,
            phone: userData.phone
            // phone:'+923123680434'
        }, config)
    },

    getUserProfile: function (userData) {
        console.log(userData.id)
        console.log(userData.token)
        return axiosInstance.post('registration/profileDetail', {
            id: userData.id,
            review_by: userData.type
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
    userStepCount: function (userData) {
        return axiosInstance.post('registration/updateStepsCount', {
            user_id: userData.id,
            steps_count: userData.steps_count
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },
    updateFCMToken: function (userData) {
        return axiosInstance.post('registration/updateFcmtoken', {
            user_id: userData.id,
            fcmToken: userData.fcmToken
        }, {
            headers: {
                'Authorization': 'Bearer ' + userData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    },
    getCodeForResetPass: function (email) {
        return axiosInstance.post('registration/getCodeForResetPass', {
            email: email
        }, config)
    },
    updatePassword: function (userData) {
        return axiosInstance.post('registration/updatePassword', {
            id: userData.id,
            newPassword: userData.password
        }, config)
    },
    verifyCodeForResetPass: function (code) {
        return axiosInstance.post('registration/verifyCodeForResetPass', {
            code: code
        }, config)
    },
};

export default Api;