import { types } from './types';

const initialState = {
    list: [],
};

function addToCart(oldObject, addedProduct) {
    const product = oldObject.list.find(
        (product) => product._id === addedProduct._id
    );
    if (product) {
        oldObject.list.map((product) => {
            if (product._id === addedProduct._id) {
                product.quantity += Number(addedProduct.quantity);
            }
            return product;
        });
        return Object.assign({}, oldObject);
    }
    oldObject.list.push(addedProduct);
    return Object.assign({}, oldObject);
}

const cartReducer = (state = initialState, { type, value }) => {
    switch (type) {
        case types.ADD_TO_CART:
            return addToCart(state, value);
        case types.RESET_CART:
            return {
                list: [],
            };
        default:
            return { ...state };
    }
};

export default cartReducer;
