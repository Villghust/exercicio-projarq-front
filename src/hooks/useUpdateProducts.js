import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateProducts } from '../actions/stockProductsActions';

function useUpdateProducts() {
    const dispatch = useDispatch();
    const stockProductsState = useSelector((state) => state.stockProducts);

    useEffect(() => {
        //check if already have products in state
        if (stockProductsState.products.length === 0) {
            dispatch(updateProducts());
        }
        //eslint-disable-next-line
    }, []);
}

export default useUpdateProducts;
