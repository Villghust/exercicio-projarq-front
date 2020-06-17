import { types } from '../reducers/types';

export const openSnackbar = ({ message, status }) => (dispatch) => {
    dispatch({
        type: types.OPEN_SNACKBAR,
        open: true,
        message,
        status,
    });
};

export const closeSnackbar = () => (dispatch) => {
    dispatch({
        type: types.CLOSE_SNACKBAR,
    });
};
