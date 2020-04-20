import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Button, Snackbar, TextField } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import api from '../../services/api';
import {
    isAuthenticated,
    saveSession,
    saveToken,
} from '../../utils/checkAuthentication';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginComponent() {
    let history = useHistory();

    const validationSchema = yup.object().shape({
        username: yup.string().required('Nome de usuário é obrigatório'),
        password: yup
            .string()
            .min(8, 'A senha deve conter no mínimo 8 caracteres')
            .required('Uma senha deve ser informada'),
    });

    const initialValues = {
        username: '',
        password: '',
    };

    // snackbar state
    const [open, setOpen] = React.useState({
        status: false,
        message: '',
        severity: '',
    });

    const handleOpen = ({ message, severity }) => {
        setOpen({
            status: true,
            message,
            severity,
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen({
            ...open,
            status: false,
        });
    };

    // check if it's authenticated. if so, redirect to caixa page
    useEffect(() => {
        isAuthenticated() && history.push('/caixa');
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Container maxWidth="sm">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        api.post('/sessions', {
                            email: values.username,
                            password: values.password,
                        })
                            .then((response) => {
                                handleOpen({
                                    message: 'Login efetuado!',
                                    severity: 'success',
                                });
                                saveToken(response.data.token);
                                saveSession(response.data.session_id);
                                history.push('/caixa');
                            })
                            .catch(() => {
                                handleOpen({
                                    message: 'Erro ao fazer login',
                                    severity: 'error',
                                });
                            });
                    }}
                >
                    {({ errors, touched, values }) => (
                        <Form className="flex-all-center-column-div">
                            <Field
                                name="username"
                                variant="outlined"
                                label="Usuário"
                                as={TextField}
                                margin="normal"
                                error={!!(touched.username && errors.username)}
                                helperText={touched.username && errors.username}
                                fullWidth
                            />
                            <Field
                                name="password"
                                type="password"
                                variant="outlined"
                                label="Senha"
                                as={TextField}
                                margin="normal"
                                error={!!(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                                fullWidth
                            />
                            <Button type="submit" variant="outlined">
                                ENTRAR
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
            <Snackbar
                open={open.status}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={open.severity}>
                    {open.message}
                </Alert>
            </Snackbar>
        </>
    );
}
