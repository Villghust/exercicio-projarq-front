import { v4 as uuidv4 } from 'uuid';

import { Purchases } from '../models/Purchases';

export function store({ total_price, session_id, payment_type, product_list }) {
    let totalPrice = 0;

    product_list.forEach(
        (product) => (totalPrice += product.price * product.quantity)
    );

    if (total_price !== totalPrice) {
        return {
            error: "Total price must be the sum of all the products's price",
        };
    }

    const _id = uuidv4();

    Purchases.push({
        _id,
        product_list,
        total_price,
        session_id,
        payment_type,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    return { _id, total_price, product_list, payment_type };
}

export function list({ session_id }) {
    const purchases = Purchases.filter(
        (purchase) => purchase.session_id === session_id
    );

    let final_price = 0;

    const response = purchases.map((purchase) => {
        const { _id, total_price, product_list, payment_type } = purchase;

        final_price += total_price;

        return { _id, total_price, product_list, payment_type };
    });

    return { final_price, purchases: response };
}
