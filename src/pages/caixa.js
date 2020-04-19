import React, { useState } from 'react';

import { Button, Container, Grid, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import Cart from '../components/cart';
import Lottie from 'react-lottie';
import shop from '../assets/icons/shop';

const initialValues = {
    cartList: [],
    product: '',
    quantity: 1,
};

export default function Caixa() {
    const dummyProducts = [
        {
            _id: 1,
            name: 'Coca-Cola',
            price: 2.99,
            image:
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cfacdn.com%2Fimg%2Forder%2FCOM%2FMenu_Refresh%2FDrinks%2FDrinks%2520PDP%2F_0000s_0022_Feed_Menu_0000_Drinks_Coca-cola.png&f=1&nofb=1',
        },
        {
            _id: 2,
            name: 'Pepsi',
            price: 2.89,
            image:
                'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.willyjoes.com%2Fwp-content%2Fuploads%2F2014%2F02%2Fdq-drinks-soft-pepsi.png&f=1&nofb=1',
        },
        {
            _id: 3,
            name: 'Manteiga',
            price: 1.99,
            image:
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fbutter%2Fbutter_PNG17.png&f=1&nofb=1',
        },
        {
            _id: 4,
            name: 'Vinho',
            price: 52.0,
            image:
                'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fimage%2Fgettyimages-484649636-red-wine1.jpg%3Fitok%3DIvC3qi9Z&f=1&nofb=1',
        },
        {
            _id: 5,
            name: 'Arroz',
            price: 5.2,
            image:
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hippressurecooking.com%2Fwp-content%2Fuploads%2F2013%2F09%2Fsteamed_rice_artc.jpg&f=1&nofb=1',
        },
        {
            _id: 6,
            name: 'Feijão',
            price: 6.3,
            image:
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seriouseats.com%2Fimages%2F2016%2F07%2F20160707-legumes-red-kidney-beans-vicky-wasik-4-1500x1125.jpg&f=1&nofb=1',
        },
        {
            _id: 7,
            name: 'Açúcar',
            price: 4.5,
            image:
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.oxygenmag.com%2F.image%2Ft_share%2FMTUwNDI4MjUzMzk4ODM2OTA3%2Ftable-sugar.jpg&f=1&nofb=1',
        },
        {
            _id: 8,
            name: 'Farinha',
            price: 2.85,
            image:
                'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wisegeek.com%2Fflour-in-white-dish-on-table.jpg&f=1&nofb=1',
        },
    ];

    const [addedProductImage, setAddedProductImage] = useState('');

    function addToList({ values, resetForm, products }) {
        const product = products.find(
            (product) => String(product._id) === String(values.product)
        );
        let newCartList;
        if (
            values.cartList.filter(
                (listProduct) => listProduct.product._id === product._id
            ).length > 0
        ) {
            values.cartList.map((listProduct) => {
                if (listProduct.product._id === product._id) {
                    listProduct.quantity =
                        parseInt(listProduct.quantity) +
                        parseInt(values.quantity);
                    return listProduct;
                } else return listProduct;
            });
        } else {
            newCartList = values.cartList.push({
                product: product,
                quantity: values.quantity,
            });
        }
        setAddedProductImage(product.image);
        resetForm({
            cartList: newCartList,
            product: '',
            quantity: 1,
        });
    }

    const iconOptions = {
        loop: false,
        autoplay: true,
        animationData: shop,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
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
                            products: dummyProducts,
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
                                                    <img
                                                        src={addedProductImage}
                                                        style={{
                                                            height: 128,
                                                            maxWidth: 128,
                                                            borderRadius: 3,
                                                        }}
                                                    />
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
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Cart list={values.cartList} />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Container>
        </div>
    );
}
