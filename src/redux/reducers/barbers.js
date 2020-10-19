import {
    BARBERS_LIST_SUCCESS,
    LOADING_BARBERS_SUCCESS
} from '../types';

const initialState = {
    barberList: [],

    loading: false

};

const barbers = (state = initialState, action) => {
    switch (action.type) {
        case BARBERS_LIST_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                barberList: action.barberList
            };

        case LOADING_BARBERS_SUCCESS:
            return {
                ...state,
                loading: action.loading
            }

        default:
            return state;
    }
};

export default barbers;
