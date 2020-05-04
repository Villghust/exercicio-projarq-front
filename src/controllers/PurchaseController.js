import * as Yup from 'yup';

import Purchase from '../models/Purchase';
import Product from '../models/Product';

class PurchaseController {
    async store(req, res) {
        const schema = Yup.object().shape({
            total_price: Yup.number().required(),
            session_id: Yup.string().required(),
            payment_type: Yup.string().required(),
            product_list: Yup.array(
                Yup.object().shape({
                    id: Yup.string().required(),
                    price: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ).required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        let totalPrice = 0;

        req.body.product_list.forEach(
            (product) => (totalPrice += product.price * product.quantity)
        );

        if (req.body.total_price !== totalPrice) {
            return res.status(400).json({
                error:
                    "Total price must be the sum of all the products's price",
            });
        }

        for (const product of req.body.product_list) {
            const { id, quantity } = product;

            const p = await Product.findById(id);

            await Product.findByIdAndUpdate(id, {
                stock_quantity: p.stock_quantity - quantity,
            });
        }

        const {
            _id,
            total_price,
            product_list,
            payment_type,
        } = await Purchase.create(req.body);

        return res
            .status(201)
            .json({ _id, total_price, product_list, payment_type });
    }

    async list(req, res) {
        const { session_id } = req.query;

        const purchases = await Purchase.find({ session_id })
            .sort({ createdAt: 'desc' })
            .limit(20);

        let final_price = 0;

        const response = purchases.map((purchase) => {
            const { _id, total_price, product_list, payment_type } = purchase;

            final_price += total_price;

            return { _id, total_price, product_list, payment_type };
        });

        return res.status(200).json({ final_price, purchases: response });
    }
}

export default new PurchaseController();
