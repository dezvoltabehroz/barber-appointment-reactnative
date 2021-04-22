
import axiosInstance from './Interceptor';
import moment from 'moment'
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
            userName: userData.full_name,
            booking_price: userData.booking_price,
            booking_time_duration: userData.booking_time_duration,
            customer_lat: userData.customer_lat,
            customer_long: userData.customer_long,
            booking_date: userData.booking_date,
            booking_time: userData.booking_time,
            barber_id: userData.barber_id,
            customer_id: userData.customer_id,
            customer_services: userData.customer_services,
            customer_address: userData.customer_address,
            card_detail: userData.card_detail,
            is_accepted: userData.is_accepted,
            is_accepted_time: userData.is_accepted_time,
            is_paypal: userData.is_paypal
        }, configToken(userData.token))
    },
    initiatePayment: function (userData) {
        return axiosInstance.post('paypal/initiatePayment', {
            id: userData.id,
            cost: parseInt(userData.booking_price)
        }, configToken(userData.token))
    },
    verifyPaymentCard: function (userData) {
        return axiosInstance.post('paypal/verifyPaymentCard', {
            id: userData.id,
            number: userData.card_detail.card_number,
            exp_month: userData.card_detail.exp_month,
            exp_year: userData.card_detail.exp_year,
            cvc: userData.card_detail.ccv_code
        }, configToken(userData.token))
    },
    initiateStripePayment: function (userData) {
        return axiosInstance.post('paypal/initiatePaymentStripe', {
            id: userData.id,
            cost: parseInt(userData.booking_price),
            token_id: userData.token_id
        }, configToken(userData.token))
    },
    savePaymentData: function (userData) {
        return axiosInstance.post('paypal/savePaymentData', {
            id: userData.id,
            order_id: userData.order_id,
            booking_id: userData.booking_id
        }, configToken(userData.token))
    },
    getCardDetails: function (userData) {
        return axiosInstance.post('paypal/getCardDetails', {
            id: userData.id
        }, configToken(userData.token))
    },
    listReceipt: function (userData) {
        return axiosInstance.post('paypal/listReceipt', {
            id: userData.id
        }, configToken(userData.token))
    },
    saveStripePaymentData: function (userData) {
        return axiosInstance.post('paypal/saveStripePayment', {
            id: userData.id,
            token_id: userData.token_id,
            booking_id: userData.booking_id,
            client_ip: userData.client_ip,
            card_id: userData.card_id,
            charge_id: userData.charge_id,
            balance_transaction: userData.balance_transaction,
            payment_method: userData.payment_method,
            receipt_url: userData.receipt_url,
        }, configToken(userData.token))
    },
    getAllBooking: function (userData) {
        let date = moment().format('YYYY-MM-DD');
        return axiosInstance.post('booking/allBooking', {
            id: userData.id,
            curr_date: date
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
            review_by: userData.review_by,
            is_services_rate_time: userData.is_services_rate_time,
            userName: userData.userName,
            booking_id: userData.booking_id
        }, configToken(userData.token))
    },
    getBarberBookingList: function (userData) {
        return axiosInstance.post('booking/barberBookingList', {
            id: userData.id,
            current_date: userData.current_date
        }, configToken(userData.token))
    },
    getBarberBookingHistory: function (userData) {
        let date = moment().format('YYYY-MM-DD');
        return axiosInstance.post('booking/barberBookingHistoryList', {
            id: userData.id,
            curr_date: date
        }, configToken(userData.token))
    },
    acceptBookingOfCustomer: function (userData) {
        return axiosInstance.post('booking/acceptBooking', {
            id: userData.id,
            booking_id: userData.booking_id,
            userName: userData.userName,
            customer_id: userData.customer_id
        }, configToken(userData.token))
    },
    declineBookingOfCustomer: function (userData) {
        return axiosInstance.post('booking/declineBooking', {
            id: userData.id,
            booking_id: userData.booking_id,
            userName: userData.userName,
            customer_id: userData.customer_id
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
            is_arrived_time: userData.is_arrived_time,
            userName: userData.userName,
            customer_id: userData.customer_id
        }, configToken(userData.token))
    },
    barberStartServices: function (userData) {
        return axiosInstance.post('booking/startedServices', {
            id: userData.id,
            booking_id: userData.booking_id,
            is_started_time: userData.is_started_time,
            userName: userData.userName,
            customer_id: userData.customer_id
        }, configToken(userData.token))
    },
    barberEndServices: function (userData) {
        return axiosInstance.post('booking/endServices', {
            id: userData.id,
            booking_id: userData.booking_id,
            is_completed_time: userData.is_completed_time,
            userName: userData.userName,
            customer_id: userData.customer_id
        }, configToken(userData.token))
    },
    getBookingTiming: function (userData) {
        return axiosInstance.post('booking/startAndEndTime', {
            id: userData.id,
            booking_id: userData.booking_id,
            type: userData.type
        }, configToken(userData.token))
    },
    rateAndReviewCustomer: function (userData) {
        return axiosInstance.post('booking/rateCustomer', {
            customer_id: userData.customer_id,
            id: userData.id,
            comment: userData.comment,
            no_of_star: userData.no_of_star,
            review_by: userData.review_by,
            is_customer_rate_time: userData.is_customer_rate_time,
            userName: userData.userName,
            booking_id: userData.booking_id
        }, configToken(userData.token))
    },
    approveBookingByCustomer: function (userData) {
        return axiosInstance.post('booking/approveBookingByCustomer', {
            id: userData.id,
            booking_id: userData.booking_id,
            is_services_accepted_time: userData.is_services_accepted_time,
            userName: userData.userName,
            barber_id: userData.barber_id
        }, configToken(userData.token))
    },
    getAllCompletedBooking: function (userData) {
        let date = moment().format('YYYY-MM-DD');
        return axiosInstance.post('booking/allCompletedBooking', {
            id: userData.id,
            curr_date: date
        }, configToken(userData.token))
    },
    deleteBookingByCustomer: function (userData) {
        return axiosInstance.post('booking/deleteBookingByCustomer', {
            id: userData.id,
            booking_id: userData.booking_id,
        }, configToken(userData.token))
    },
    rescheduleBookingByCustomer: function (userData) {
        return axiosInstance.post('booking/rescheduleBookingByCustomer', {
            id: userData.id,
            booking_id: userData.booking_id,
            barber_id: userData.barber_id,
            booking_time_duration: userData.booking_time_duration,
            booking_date: userData.booking_date,
            booking_time: userData.booking_time
        }, configToken(userData.token))
    },

};

export default Api;