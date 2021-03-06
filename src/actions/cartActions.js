import { types } from '../reducers/types';

export const addToCart = (product, quantity) => (dispatch) => {
    dispatch({
        type: types.ADD_TO_CART,
        value: { ...product, quantity },
    });
};

export const resetCart = () => (dispatch) => {
    dispatch({ type: types.RESET_CART });
};

export const deleteItem = (id) => (dispatch) => {
    dispatch({ type: types.DELETE_FROM_CART, value: id });
};
