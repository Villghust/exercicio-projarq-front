import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Snackbar } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';

import { closeSnackbar } from '../../actions/snackbarActions';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar() {
    const dispatch = useDispatch();

    const { open, message, status } = useSelector((state) => state.snackbar);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(closeSnackbar());
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <Alert onClose={handleClose} severity={status}>
                {message}
            </Alert>
        </Snackbar>
    );
}
