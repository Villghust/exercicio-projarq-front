import { types } from './types';

const initialState = {
    loading: true,
    error: false,
    products: [],
};

const stockProductsReducer = (state = initialState, { type, value }) => {
    switch (type) {
        case types.START_UPDATE_PRODUCTS:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case types.FINISH_UPDATE_PRODUCTS:
            return {
                ...state,
                loading: false,
                error: false,
                products: value,
            };
        case types.ERROR_UPDATE_PRODUCTS:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

export default stockProductsReducer;
