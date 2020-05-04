import { hash, compare } from 'bcryptjs';

export const Cryptography = {
    hash: async (password) => {
        return await hash(password, 8);
    },

    compare: async (password, passwordHash) => {
        return await compare(password, passwordHash);
    },
};
