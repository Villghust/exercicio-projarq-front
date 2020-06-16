import React from 'react';
import { useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import { CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import useUpdateProducts from './hooks/useUpdateProducts';
import Caixa from './pages/caixa';
import Checkout from './pages/checkout';
import Login from './pages/login';
import Logout from './pages/logout';
import { isAuthenticated } from './utils/checkAuthentication';

function PrivateRoute({ children, ...rest }) {
    useUpdateProducts();

    const stockProductsState = useSelector((state) => state.stockProducts);

    if (stockProductsState.loading) {
        return (
            <div className="flex-all-center-column-div flex-full">
                <CircularProgress />
            </div>
        );
    }

    if (stockProductsState.error) {
        return (
            <div>
                <Typography>Error!</Typography>
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated() ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
PrivateRoute.propTypes = {
    children: PropTypes.element.isRequired,
};

export default function Routes() {
    return (
        <Router>
            <div className="root-div">
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <PrivateRoute exact path="/caixa">
                        <Caixa />
                    </PrivateRoute>
                    <PrivateRoute exact path="/checkout">
                        <Checkout />
                    </PrivateRoute>
                    <PrivateRoute exact path="/logout">
                        <Logout />
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}
