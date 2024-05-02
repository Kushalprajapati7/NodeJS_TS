import session from 'express-session';

export const sessionMiddleware = session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
});
            