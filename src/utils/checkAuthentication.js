import jwt from 'jsonwebtoken';
export const isAuthenticated = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
        const tokenExp = jwt.decode(token).exp;
        return Date.now() <= tokenExp * 1000;
    }
};

export const saveToken = (token) => {
    window.localStorage.setItem('token', token);
};

export const saveSession = (session_id) => {
    window.localStorage.setItem('session_in', session_id);
};
