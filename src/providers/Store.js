import React, { createContext, useReducer } from 'react';

import PropTypes from 'prop-types';

import { reducer, initialState, actions } from '../reducers';

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
