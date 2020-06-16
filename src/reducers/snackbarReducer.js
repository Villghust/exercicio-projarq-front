import { types } from './types';

export const initialState = {
    open: false,
    message: '',
    status: '',
};

const snackbarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_SNACKBAR:
            return {
                ...state,
                open: action.open,
                message: action.message,
                status: action.status,
            };
        case types.CLOSE_SNACKBAR:
            return {
                ...state,
                open: false,
            };
        default:
            return { ...state };
    }
};

export default snackbarReducer;
