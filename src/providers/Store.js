import React, { createContext, useReducer } from 'react';

import { reducer, initialState, actions } from '../reducers';
import PropTypes from 'prop-types';

export const StoreContext = createContext();

export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, actions, dispatch }}>
            {props.children}
        </StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.node,
};
