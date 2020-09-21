import {
    CATEGORIES_SUCCESS,
    SERVICES_SUCCESS,
    SUB_CATEGORIES_SUCCESS,
    LOADING_CATEGORIES_SUCCESS
} from '../types';

const initialState = {
    categories: [],
    subCategories: [],
    services: [],
    loading: false

};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                categories: action.categories
            };
        case SUB_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                subCategories: action.subCategories
            };
        case SERVICES_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                services: action.services
            };
        case LOADING_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: action.loading
            }

        default:
            return state;
    }
};

export default categories;
