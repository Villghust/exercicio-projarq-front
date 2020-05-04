import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import PropTypes from 'prop-types';

import { isAuthenticated } from './utils/checkAuthentication';
import Caixa from './views/caixa';
import Checkout from './views/checkout';
import Login from './views/login';
import Logout from './views/logout';

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
