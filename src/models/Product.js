const Product = (
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        stock_quantity: {
            type: Number,
            required: true,
        },
        image_link: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default Product;