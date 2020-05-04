const Product = (
    {
        id: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const Purchase = (
    {
        total_price: {
            type: Number,
            required: true,
        },
        product_list: {
            type: [Object],
            required: true,
        },
        session_id: {
            type: String,
            ref: 'Session',
            required: true,
        },
        payment_type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default Purchase;