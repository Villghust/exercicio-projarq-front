import React from 'react';

import { Divider, List, ListItem, Grid, Typography } from '@material-ui/core';
import currency from 'currency.js';
import PropTypes from 'prop-types';

import emptyCart from '../../assets/icons/empty-cart.svg';

export default function Cart({ list }) {
    function sumTotal({ list }) {
        let total = 0;
        list.forEach((listProduct) => {
            total = currency(total).add(
                currency(
                    currency(listProduct.product.price).divide(100)
                ).multiply(listProduct.quantity)
            );
        });
        return currency(total).format();
    }

    const total = sumTotal({ list });

    if (list.length < 1) {
        return (
            <div
                style={{
                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                    borderRadius: 3,
                    minHeight: 256,
                }}
                className="flex-all-center-column-div"
            >
                <img
                    src={emptyCart}
                    alt="Carrinho vazio"
                    width={112}
                    height={112}
                />
                <Typography align="center" style={{ marginTop: 22 }}>
                    Carrinho vazio
                </Typography>
            </div>
        );
    }

    return (
        <div
            style={{
                boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                borderRadius: 3,
            }}
        >
            <List component="nav">
                {list.map((product) => (
                    <ListItem key={product.product._id}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>
                                    {product.quantity} x {product.product.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography align="right">
                                    R${' '}
                                    {currency(product.quantity)
                                        .multiply(
                                            currency(
                                                product.product.price
                                            ).divide(100)
                                        )
                                        .format()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
                <Divider />
                <ListItem style={{ justifyContent: 'flex-end' }}>
                    <Typography>Total: R$ {total}</Typography>
                </ListItem>
            </List>
        </div>
    );
}
Cart.propTypes = {
    list: PropTypes.array.isRequired,
};
