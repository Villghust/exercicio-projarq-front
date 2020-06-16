import { types } from '../reducers/types';
import api from '../services/api';

export const updateProducts = () => async (dispatch) => {
    dispatch({ type: types.START_UPDATE_PRODUCTS });
    try {
        const products = await api.get('products');
        dispatch({
            type: types.FINISH_UPDATE_PRODUCTS,
            value: products.data,
        });
    } catch (e) {
        dispatch({ type: types.ERROR_UPDATE_PRODUCTS });
    }
};
