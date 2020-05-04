const User = (
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password_hash: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false,
    }
);

export default User;