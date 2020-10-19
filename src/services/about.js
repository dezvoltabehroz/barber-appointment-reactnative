
import axiosInstance from './Interceptor';
let config = { headers: { 'Content-Type': 'application/json' } }
const Api = {
    getAboutUs: function () {
        return axiosInstance.get('cms/aboutus', {})
    },
    postContactUs: function (userData) {
        return axiosInstance.post('cms/contactus', {
            name: userData.name,
            email: userData.email,
            subject: userData.subject,
            message: userData.message
        },config)
    },
}
export default Api;