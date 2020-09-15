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
    updateProfileInfo: function (name, gender, dob, phone, photo) {
        let formData = new FormData();

        formdata.append("full_name", name);
        formdata.append("gender", gender);
        formdata.append("dob", dob);
        formdata.append("phone", phone);
        formdata.append("image", photo);

        return axiosInstance.post('registration/updatePersonalInfo', {
            formData
        },{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    },
};

export default Api;