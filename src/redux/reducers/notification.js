import {
    LOADING_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS
} from '../types';

const initialState = {
    notifications: [],
    loading: false,
    notificationCount: 0,

};

const notifications = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                loading: action.loading,
                notifications: action.notifications,
                notificationCount: action.notificationCount
            };
        case LOADING_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state;
    }
};

export default notifications;
