import { types } from './types';

export const initialState = {
    open: false,
    message: '',
    status: '',
};

export const reducer = (state, action) => {
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

export const register = (globalState) => {
    globalState.snackBar = initialState;
};
