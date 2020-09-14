import axiosInstance from './Interceptor';
const Api = {
    sendCodeToPhoneNumber: function (number) {
        return axiosInstance.post('registration/regPhoneNumber', {
            phone: `${number}`
        })
    },
    verifyTheCode: function (code) {
        return axiosInstance.post('registration/verifyCode', {
            code: `${code}`
        })
    },
};

export default Api;