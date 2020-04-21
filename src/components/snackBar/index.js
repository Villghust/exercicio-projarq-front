import React from 'react';
import useSnackBar from '../../hooks/useSnackBar';
import { Snackbar } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBar() {
    const snackBarContext = useSnackBar();

    const { open, message, status } = snackBarContext.state.snackBar;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        snackBarContext.closeSnackBar();
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
