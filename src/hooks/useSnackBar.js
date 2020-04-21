import { useContext } from 'react';

import { StoreContext } from '../providers/Store';
import { types } from '../reducers/types';

export default function useSnackBar() {
    const { state, dispatch } = useContext(StoreContext);

    const openSnackBar = ({ message, status }) => {
        dispatch({
            type: types.OPEN_SNACKBAR,
            open: true,
            message,
            status,
        });
    };

    const closeSnackBar = () => {
        dispatch({
            type: types.CLOSE_SNACKBAR,
        });
    };

    return {
        state,
        openSnackBar,
        closeSnackBar,
    };
}
