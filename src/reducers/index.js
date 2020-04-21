import {
    register as snackBarRegister,
    reducer as snackBarReducer,
} from './snackBarReducer';

export const initialState = {};
export const actions = {};

snackBarRegister(initialState, actions);

export const reducer = (state, action) => {
    return {
        snackBar: snackBarReducer(state.snackBar, action),
    };
};
