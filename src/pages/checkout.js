import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import currency from 'currency.js';
import { Form, Formik } from 'formik';

import { resetCart } from '../actions/cartActions';
import { openSnackbar } from '../actions/snackbarActions';
import wallet from '../assets/icons/wallet';
import Cart from '../components/cart';
import api from '../services/api';

const buttonStyles = makeStyles({
    root: {
        margin: '5px 0',
    },
});

export default function Checkout() {
    const history = useHistory();

    const buttonClasses = buttonStyles();

    // get list from history state
    const list = useSelector((state) => state.cart.list);

    // redirect to caixa in case of empty list
    useEffect(() => {
        if (list.length === 0) {
            history.push('/caixa');
        }
        //eslint-disable-next-line
    }, []);

    // lottie icon
    const iconOptions = {
        loop: false,
        autoplay: true,
        animationData: wallet,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    // sum cart total
    function sumTotal({ list }) {
        let total = 0;
        list.forEach((listProduct) => {
            total = currency(total).add(
                currency(currency(listProduct.price).divide(100)).multiply(
                    listProduct.quantity
                )
            );
        });
        return currency(total).intValue;
    }

    // submit
    function submit({ setFieldValue, payment, submitForm, values }) {
        setFieldValue('payment_type', payment, false);
        setFieldValue(
            'total_price',
            sumTotal({ list: values.product_list }),
            false
        );
        submitForm();
    }

    // set initial formik list value
    function setProductList({ list }) {
        let product_list = [];
        list.forEach((product) => {
            const productToArray = {
                id: product._id,
                price: product.price,
                quantity: product.quantity,
            };
            product_list.push(productToArray);
        });
        return product_list;
    }

    // open snackbar
    const dispatch = useDispatch();

    return (
        <div className="flex-all-center-column-div flex-full">
            <Lottie options={iconOptions} width={256} height={256} />
            <Container maxWidth="md" style={{ marginTop: 50 }}>
                <Formik
                    initialValues={{
                        product_list: setProductList({ list }),
                        total_price: '',
                        session_id: window.localStorage.getItem('session_id'),
                        payment_type: '',
                    }}
                    onSubmit={async (values) => {
                        try {
                            await api.post('/purchases', { ...values });
                            dispatch(
                                openSnackbar({
                                    message: 'Compra finalizada',
                                    status: 'success',
                                })
                            );
                            dispatch(resetCart());
                            history.push('/caixa');
                        } catch (e) {
                            dispatch(
                                openSnackbar({
                                    message: 'Erro ao finalizar a compra',
                                    status: 'error',
                                })
                            );
                        }
                    }}
                >
                    {({ setFieldValue, submitForm, values }) => (
                        <Form>
                            <Grid container spacing={6} alignItems="center">
                                <Grid item md={6} xs={12}>
                                    <Cart list={list} />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography align="center">
                                        Selecionar o método de pagamento
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        classes={{ root: buttonClasses.root }}
                                        onClick={() =>
                                            submit({
                                                payment: 'cash',
                                                setFieldValue,
                                                submitForm,
                                                values,
                                            })
                                        }
                                    >
                                        Dinheiro
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        classes={{ root: buttonClasses.root }}
                                        onClick={() =>
                                            submit({
                                                payment: 'credit_card',
                                                setFieldValue,
                                                submitForm,
                                                values,
                                            })
                                        }
                                    >
                                        Cartão de Crédito
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        classes={{ root: buttonClasses.root }}
                                        onClick={() =>
                                            submit({
                                                payment: 'debit_card',
                                                setFieldValue,
                                                submitForm,
                                                values,
                                            })
                                        }
                                    >
                                        Cartão de Débito
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        classes={{ root: buttonClasses.root }}
                                        onClick={() =>
                                            submit({
                                                payment: 'cheque',
                                                setFieldValue,
                                                submitForm,
                                                values,
                                            })
                                        }
                                    >
                                        Cheque
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}
