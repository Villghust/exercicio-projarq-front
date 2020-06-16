import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
    Button,
    CircularProgress,
    Container,
    Dialog,
    Grid,
    List,
    ListItem,
    Snackbar,
    TextField,
    Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import currency from 'currency.js';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';

import { addToCart } from '../actions/cartActions';
import { openSnackbar } from '../actions/snackbarActions';
import shop from '../assets/icons/shop';
import Cart from '../components/cart';
import useApiRequest from '../hooks/useApiRequest';

let initialValues = {
    cartList: [],
    product: '',
    quantity: 1,
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ListProducts({ open, handleClose }) {
    const list = useSelector((state) => state.stockProducts.products);
    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <List component="nav">
                {list.map((product) => (
                    <ListItem key={product._id}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>{product._id}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>{product.name}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography align="right">
                                    R${' '}
                                    {currency(product.price)
                                        .divide(100)
                                        .format()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}
ListProducts.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default function Caixa() {
    // recreate initialValues when rendering form again (when coming back from checkout)
    useEffect(() => {
        initialValues = {
            product: '',
            quantity: 1,
        };
    }, []);

    // dispatch snackbar
    const dispatch = useDispatch();

    // stock products state
    const stockProductsState = useSelector((state) => state.stockProducts);

    // products in cart
    const cartList = useSelector((state) => state.cart.list);

    // history hook
    const history = useHistory();

    // product image
    const [addedProductImage, setAddedProductImage] = useState('');

    // snackbar status
    const [open, setOpen] = useState({
        status: false,
        message: '',
    });
    const handleClick = ({ message }) => {
        setOpen({
            status: true,
            message,
        });
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen({ ...open, status: false });
    };

    // add products to cart
    function addToList({ values, resetForm }) {
        const matchedProduct = stockProductsState.products.filter(
            (product) => product._id === values.product
        );
        if (matchedProduct.length === 0) {
            return dispatch(
                openSnackbar({
                    message: 'Produto não encontrado',
                    status: 'error',
                })
            );
        }
        dispatch(addToCart(matchedProduct[0], values.quantity));
        setAddedProductImage(matchedProduct[0].image_link);
        resetForm({
            product: '',
            quantity: 1,
        });
    }

    // lottie icon
    const iconOptions = {
        loop: false,
        autoplay: true,
        animationData: shop,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    // products listing
    const [productListing, setProductListing] = useState(false);
    const handleClickOpen = () => {
        setProductListing(true);
    };

    const handleClickClose = () => {
        setProductListing(false);
    };

    return (
        <div className="flex-all-center-column-div flex-full">
            <Container maxWidth="md">
                <div>
                    <Lottie options={iconOptions} height={256} width={256} />
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                        addToList({
                            values,
                            resetForm,
                        });
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <Grid container spacing={4} alignItems="center">
                                <Grid item md={6} xs={12}>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                        justify="center"
                                    >
                                        {addedProductImage && (
                                            <Grid item xs={12}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                >
                                                    {addedProductImage && (
                                                        <img
                                                            src={
                                                                addedProductImage
                                                            }
                                                            style={{
                                                                height: 128,
                                                                maxWidth: 128,
                                                                borderRadius: 3,
                                                            }}
                                                            alt="Produto"
                                                        />
                                                    )}
                                                </div>
                                            </Grid>
                                        )}

                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Field
                                                        name="product"
                                                        label="Código do produto"
                                                        as={TextField}
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Field
                                                        name="quantity"
                                                        label="Quantidade"
                                                        as={TextField}
                                                        variant="outlined"
                                                        margin="normal"
                                                        fullWidth
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="outlined"
                                            >
                                                Adicionar
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                style={{ marginTop: 5 }}
                                                onClick={handleClickOpen}
                                            >
                                                Listar produtos
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Cart />
                                    {cartList.length > 0 ? (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            style={{ marginTop: 10 }}
                                            onClick={() =>
                                                history.push('/checkout', {
                                                    list: values.cartList,
                                                })
                                            }
                                        >
                                            Finalizar compra
                                        </Button>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            style={{ marginTop: 10 }}
                                            onClick={() =>
                                                history.push('/logout')
                                            }
                                        >
                                            Finalizar sessão
                                        </Button>
                                    )}
                                </Grid>
                            </Grid>
                            <ListProducts
                                open={productListing}
                                handleClose={handleClickClose}
                            />
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
                <Alert onClose={handleClose} severity="error">
                    {open.message}
                </Alert>
            </Snackbar>
        </div>
    );
}
