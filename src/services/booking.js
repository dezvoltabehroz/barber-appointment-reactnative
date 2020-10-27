
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
            card_detail: userData.card_detail,
            is_accepted: userData.is_accepted,
            is_accepted_time: userData.is_accepted_time
        }, configToken(userData.token))
    },
    getAllBooking: function (userData) {
        return axiosInstance.post('booking/allBooking', {
            id: userData.id
        }, configToken(userData.token))
    },
    getBookingDetails: function (userData) {
        return axiosInstance.post('booking/bookingDetails', {
            id: userData.id,
            booking_id: userData.booking_id,
            barber_id: userData.barber_id
        }, configToken(userData.token))
    },
    rateAndReviewBarberServices: function (userData) {
        return axiosInstance.post('booking/rateServices', {
            barber_id: userData.barber_id,
            id: userData.customer_id,
            comment: userData.comment,
            no_of_star: userData.no_of_star,
            review_by: userData.review_by
        }, configToken(userData.token))
    },
    getBarberBookingList: function (userData) {
        return axiosInstance.post('booking/barberBookingList', {
            id: userData.id,
        }, configToken(userData.token))
    },
    acceptBookingOfCustomer: function (userData) {
        return axiosInstance.post('booking/acceptBooking', {
            id: userData.id,
            booking_id: userData.booking_id
        }, configToken(userData.token))
    },
    declineBookingOfCustomer: function (userData) {
        return axiosInstance.post('booking/declineBooking', {
            id: userData.id,
            booking_id: userData.booking_id
        }, configToken(userData.token))
    },
    getCustomerDetails: function (userData) {
        return axiosInstance.post('list/customerProfile', {
            id: userData.id,
            booking_id: userData.booking_id
        }, configToken(userData.token))
    },
    arrivedAtCustomerLocation: function (userData) {
        return axiosInstance.post('booking/arrivedLocation', {
            id: userData.id,
            booking_id: userData.booking_id,
            is_arrived_time: userData.is_arrived_time
        }, configToken(userData.token))
    },
    barberStartServices: function (userData) {
        return axiosInstance.post('booking/startedServices', {
            id: userData.id,
            booking_id: userData.booking_id,
            is_started_time: userData.is_started_time
        }, configToken(userData.token))
    },
    barberEndServices: function (userData) {
        return axiosInstance.post('booking/endServices', {
            id: userData.id,
            booking_id: userData.booking_id,
            is_completed_time: userData.is_completed_time
        }, configToken(userData.token))
    },
    getBookingTiming: function (userData) {
        return axiosInstance.post('booking/startAndEndTime', {
            id: userData.id,
            booking_id: userData.booking_id,
        }, configToken(userData.token))
    },
    rateAndReviewCustomer: function (userData) {
        return axiosInstance.post('booking/rateCustomer', {
            customer_id: userData.customer_id,
            id: userData.id,
            comment: userData.comment,
            no_of_star: userData.no_of_star,
            review_by: userData.review_by
        }, configToken(userData.token))
    },

};

export default Api;