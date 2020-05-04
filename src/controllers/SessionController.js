import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '../config/auth';
import { Cryptography } from '../lib/Cryptography';
import { Sessions } from '../models/Session';
import User from '../models/User.json';

export async function store({ email, password }) {
    const user = User.Users.find((user) => user.email === email);

    if (!user) {
        return { error: 'User not found' };
    }

    const isPasswordValid = await Cryptography.compare(
        password,
        user.password_hash
    );

    if (!isPasswordValid) {
        return { error: 'Incorrect Password' };
    }

    const { _id, name } = user;

    const session_id = uuidv4();
    Sessions.push({
        _id: session_id,
        isValid: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    return {
        user: { _id, name, email },
        session_id,
        token: jwt.sign({ _id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        }),
    };
}

export function deleteSession({ sessionId }) {
    Sessions.map((session) => {
        if (session._id === sessionId) {
            session.is_valid = false;
        }
    });
}
