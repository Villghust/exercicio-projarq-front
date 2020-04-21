import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import Caixa from './pages/caixa';
import Login from './pages/login';
import { isAuthenticated } from './utils/checkAuthentication';
import Checkout from './pages/checkout';

function PrivateRoute({ children, ...rest }) {
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
                </Switch>
            </div>
        </Router>
    );
}
