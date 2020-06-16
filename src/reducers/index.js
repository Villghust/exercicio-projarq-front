import { combineReducers } from 'redux';

import snackbarReducer from './snackbarReducer';
import stockProductsReducer from './stockProductsReducer';
import cartReducer from './cartReducer';

const rootReducers = combineReducers({
    snackbar: snackbarReducer,
    stockProducts: stockProductsReducer,
    cart: cartReducer,
});

export default rootReducers;
