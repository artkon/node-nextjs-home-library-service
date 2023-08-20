import process from 'process';


const { JWT_SECRET_KEY, TOKEN_EXPIRE_TIME, JWT_SECRET_REFRESH_KEY, TOKEN_REFRESH_EXPIRE_TIME } = process.env;

export const accessTokenOptions = {
    secret: JWT_SECRET_KEY,
    expiresIn: TOKEN_EXPIRE_TIME,
};

export const refreshTokenOptions = {
    secret: JWT_SECRET_REFRESH_KEY,
    expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
};
