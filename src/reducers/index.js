import { combineReducers } from 'redux';

import cartReducer from './cartReducer';
import snackbarReducer from './snackbarReducer';
import stockProductsReducer from './stockProductsReducer';

const rootReducers = combineReducers({
    snackbar: snackbarReducer,
    stockProducts: stockProductsReducer,
    cart: cartReducer,
});

export default rootReducers;
