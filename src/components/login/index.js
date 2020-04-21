import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Button, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import useSnackBar from '../../hooks/useSnackBar';
import api from '../../services/api';
import {
    isAuthenticated,
    saveSession,
    saveToken,
} from '../../utils/checkAuthentication';

export default function LoginComponent() {
    let history = useHistory();

    const snackbarContext = useSnackBar();

    const validationSchema = yup.object().shape({
        username: yup.string().required('Nome de usuário é obrigatório'),
        password: yup
            .string()
            .min(6, 'A senha deve conter no mínimo 6 caracteres')
            .required('Uma senha deve ser informada'),
    });

    const initialValues = {
        username: '',
        password: '',
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
                                snackbarContext.openSnackBar({
                                    message: 'Login efetuado!',
                                    status: 'success',
                                });
                                saveToken(response.data.token);
                                saveSession(response.data.session_id);
                                history.push('/caixa');
                            })
                            .catch(() => {
                                snackbarContext.openSnackBar({
                                    message: 'Erro ao fazer login',
                                    status: 'error',
                                });
                            });
                    }}
                >
                    {({ errors, touched }) => (
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
        </>
    );
}
