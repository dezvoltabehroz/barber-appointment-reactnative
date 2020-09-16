import axiosInstance from './Interceptor';
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
        formData.append('phone', "+923048520554");
        formData.append('image', {
            name: userData.image.fileName,
            uri: userData.image.uri,
            type: userData.image.type
        });
        console.log(JSON.stringify(formData));
        console.log(formData);
        let header = { "Content-Type": "application/json" }
        return axiosInstance.post('registration/updatePersonalInfo', formData, header)
    },
};

export default Api;