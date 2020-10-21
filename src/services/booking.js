
import axiosInstance from './Interceptor';
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
    makeCustomerBooking: function (userData) {
        return axiosInstance.post('booking/makeBooking', {
            id: userData.id,
            booking_price: userData.booking_price,
            booking_time_duration: userData.booking_time_duration,
            customer_lat: userData.customer_lat,
            customer_long: userData.customer_long,
            booking_date: userData.booking_date,
            booking_time: userData.booking_time,
            barber_id: userData.barber_id,
            customer_id: userData.customer_id,
            customer_services: userData.customer_services,
            card_detail: userData.card_detail
        }, configToken(userData.token))
    },
    getAllBooking: function (userData) {
        return axiosInstance.post('booking/allBooking', {
            id: userData.id
        }, configToken(userData.token))
    }
};

export default Api;