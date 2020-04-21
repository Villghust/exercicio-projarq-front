import React, { useEffect } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Cart from '../components/cart';
import wallet from '../assets/icons/wallet';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';

const buttonStyles = makeStyles({
    root: {
        margin: '5px 0',
    },
});

export default function Checkout() {
    const history = useHistory();

    const buttonClasses = buttonStyles();

    // get list from history state
    const { list } = history.location.state;

    // redirect to caixa in case of empty list
    useEffect(() => {
        if (!list) {
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

    return (
        <div className="flex-all-center-column-div flex-full">
            <Lottie options={iconOptions} width={256} height={256} />
            <Container maxWidth="md" style={{ marginTop: 50 }}>
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
                        >
                            Dinheiro
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            classes={{ root: buttonClasses.root }}
                        >
                            Cartão de Crédito
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            classes={{ root: buttonClasses.root }}
                        >
                            Cartão de Débito
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            classes={{ root: buttonClasses.root }}
                        >
                            Cheque
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
