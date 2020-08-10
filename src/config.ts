import dotenv from 'dotenv';

dotenv.config();

export const config = {
   PORT: process.env.PORT || 3000,
   DB_USER: process.env.DB_USER,
   DB_PASSWORD: process.env.DB_PASSWORD,
   DB_NAME: process.env.DB_NAME,
   SENTRY_DNS: process.env.SENTRY_DNS,
   SECRET_JWT: process.env.SECRET_JWT,
   DEV: process.env.NODE_ENV !== 'production'
};
