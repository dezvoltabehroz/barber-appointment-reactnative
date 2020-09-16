import axiosInstance from './Interceptor';
import axios from 'axios';

const Api = {
    sendCodeToPhoneNumber: function (number) {
        return axiosInstance.post('registration/regPhoneNumber', {
            phone: `${number}`,
            type: "customer"
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    },
    verifyTheCode: function (code) {
        return axiosInstance.post('registration/verifyCode', {
            code: `${code}`
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
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

        console.log(JSON.stringify(formData));

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            }
        };
        return axios.post("http://ec2-18-204-20-183.compute-1.amazonaws.com:3000/api/registration/updatePersonalInfo", formData, config);
    },
};

export default Api;