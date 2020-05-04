import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    Button,
    Container,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import currency from 'currency.js';


import PurchaseController from '../controllers/PurchaseController';
import useSnackBar from '../hooks/useSnackBar';
import SessionController from '../controllers/SessionController';

export default function Logout() {
    const { data, loading, error } = PurchaseController.list(
        true, window.localStorage.getItem('session_id')
    );

    const history = useHistory();

    // snackbar
    const snackbarContext = useSnackBar();

    // sum total per payment option
    function sumTotal({ paymentOption }) {
        let total = 0;
        data.purchases.forEach((purchase) => {
            if (purchase.payment_type === paymentOption) {
                total += purchase.total_price;
            }
        });
        return currency(total).divide(100).format();
    }

    if (loading) {
        return (
            <div className="flex-all-center-column-div flex-full">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <p>Erro!</p>;
    }

    // logout
    async function finalizeSession() {
        try {
            await SessionController.delete(
                window.localStorage.getItem('session_id')
            );
            snackbarContext.openSnackBar({
                message: 'Sessão finalizada!',
                status: 'success',
            });
            window.localStorage.removeItem('session_id');
            window.localStorage.removeItem('token');
            history.push('/');
        } catch (e) {
            snackbarContext.openSnackBar({
                message: 'Erro ao finalizar sessão',
                status: 'error',
            });
        }
    }

    return (
        <div className="flex-all-center-column-div flex-full">
            <Container maxWidth="md">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID da compra</TableCell>
                                <TableCell align="right">Dinheiro</TableCell>
                                <TableCell align="right">Crédito</TableCell>
                                <TableCell align="right">Débito</TableCell>
                                <TableCell align="right">Cheque</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.purchases.map((purchase) => (
                                <TableRow key={purchase._id}>
                                    <TableCell>{purchase._id}</TableCell>
                                    <TableCell align="right">
                                        R${' '}
                                        {purchase.payment_type === 'cash'
                                            ? currency(purchase.total_price)
                                                  .divide(100)
                                                  .format()
                                            : currency(0).format()}
                                    </TableCell>
                                    <TableCell align="right">
                                        R${' '}
                                        {purchase.payment_type === 'credit_card'
                                            ? currency(purchase.total_price)
                                                  .divide(100)
                                                  .format()
                                            : currency(0).format()}
                                    </TableCell>
                                    <TableCell align="right">
                                        R${' '}
                                        {purchase.payment_type === 'debit_card'
                                            ? currency(purchase.total_price)
                                                  .divide(100)
                                                  .format()
                                            : currency(0).format()}
                                    </TableCell>
                                    <TableCell align="right">
                                        R${' '}
                                        {purchase.payment_type === 'cheque'
                                            ? currency(purchase.total_price)
                                                  .divide(100)
                                                  .format()
                                            : currency(0).format()}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell>Totais</TableCell>
                                <TableCell align="right">
                                    R$ {sumTotal({ paymentOption: 'cash' })}
                                </TableCell>
                                <TableCell align="right">
                                    R${' '}
                                    {sumTotal({ paymentOption: 'credit_card' })}
                                </TableCell>
                                <TableCell align="right">
                                    R${' '}
                                    {sumTotal({ paymentOption: 'debit_card' })}
                                </TableCell>
                                <TableCell align="right">
                                    R$ {sumTotal({ paymentOption: 'cheque' })}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={4} align="right">
                                    Total do caixa
                                </TableCell>
                                <TableCell align="right">
                                    R${' '}
                                    {currency(data.final_price)
                                        .divide(100)
                                        .format()}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    onClick={() => finalizeSession()}
                    style={{ marginTop: 10 }}
                    variant="outlined"
                >
                    Finalizar sessão
                </Button>
            </Container>
        </div>
    );
}
