import React from 'react';

import { Container, Button, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

export default function LoginComponent() {
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

    return (
        <Container maxWidth="md">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
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
                        />
                        <Button type="submit" variant="outlined">
                            ENTRAR
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}
