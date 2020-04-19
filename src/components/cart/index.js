import React from 'react';

import { Divider, List, ListItem, Grid, Typography } from '@material-ui/core';
import currency from 'currency.js';

export default function Cart({ list }) {
    function sumTotal({ list }) {
        let total = 0;
        list.forEach((listProduct) => {
            total = currency(total).add(
                currency(listProduct.product.price).multiply(
                    listProduct.quantity
                )
            );
        });
        return currency(total).format();
    }

    const total = sumTotal({ list });

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
                                        .multiply(product.product.price)
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
