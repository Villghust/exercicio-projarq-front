import * as Yup from 'yup';

import Product from '../models/ProductResponse';

class ProductController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            price: Yup.number().required(),
            stock_quantity: Yup.number().required(),
            image_link: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Product is invalid' });
        }

        const {
            _id,
            name,
            price,
            stock_quantity,
            image_link,
        } = await Product.create(req.body);

        res.status(201).json({ _id, name, price, stock_quantity, image_link });
    }

    async list(req, res) {
        const products = await Product.find({});

        return res.status(200).json(
            products.map((product) => {
                const {
                    _id,
                    name,
                    price,
                    stock_quantity,
                    image_link,
                } = product;

                return { _id, name, price, stock_quantity, image_link };
            })
        );
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            price: Yup.number(),
            stock_quantity: Yup.number(),
            image_link: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Product is invalid' });
        }

        const { product_id } = req.params;

        await Product.findByIdAndUpdate(product_id, req.body);

        const { name, price, stock_quantity } = await Product.findById(
            product_id
        );

        return res
            .status(200)
            .json({ product_id, name, price, stock_quantity });
    }
}

export default new ProductController();
