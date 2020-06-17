import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Divider, List, ListItem, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import currency from 'currency.js';

import { deleteItem } from '../../actions/cartActions';
import { openSnackbar } from '../../actions/snackbarActions';
import emptyCart from '../../assets/icons/empty-cart.svg';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            cursor: 'pointer',
        },
    },
});

export default function Cart() {
    const classes = useStyles();

    const list = useSelector((state) => state.cart.list);

    const dispatch = useDispatch();

    function sumTotal({ list }) {
        let total = 0;
        list.forEach((listProduct) => {
            total = currency(total).add(
                currency(listProduct.price)
                    .divide(100)
                    .multiply(listProduct.quantity)
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
                    <ListItem key={product._id}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>
                                    {product.quantity} x {product.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Typography align="right">
                                    R${' '}
                                    {currency(product.quantity)
                                        .multiply(
                                            currency(product.price).divide(100)
                                        )
                                        .format()}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} style={{ textAlign: 'center' }}>
                                <CancelIcon
                                    classes={{ root: classes.root }}
                                    onClick={() => {
                                        dispatch(deleteItem(product._id));
                                        dispatch(
                                            openSnackbar({
                                                message: `${product.name} foi deletado do carrinho`,
                                                status: 'success',
                                            })
                                        );
                                    }}
                                />
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
