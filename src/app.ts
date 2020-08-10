import express from 'express';
import { config } from './config';
import morgan from 'morgan';
import { join } from 'path';
import helmet from 'helmet';

import { notFound } from '@hapi/boom';
import * as Sentry from '@sentry/node';
import {
   clientErrorHandler,
   errorHandler,
   logErrors,
   wrapErrors
} from './utils/middlewares/errorsHandlers';

import productRoutes from './routes/views/product.routes';
import productApiRoutes from './routes/api/product.routes';
import userRoutes from './routes/api/user.routes';
import passport from 'passport';

// Init express
const app = express();
Sentry.init({ dsn: config.SENTRY_DNS });
/*******************************************************************
 *                               Set express
 *********************************************************************/

// settings

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Routes
app.get('/me', (_req, res) => {
   res.json({
      username: 'angelozdev',
      name: 'Angelo Zambrano',
      age: 22,
      twitter: '@angelozdev',
      github: 'https://github.com/angelozdev'
   });
});
app.get('/', (_req, res) => {
   res.render('index', { title: 'Express | Home' });
});
app.use('/products', productRoutes);
app.use('/api/products', productApiRoutes);
app.use('/api/users', userRoutes);

// Error Handlers
app.use(Sentry.Handlers.errorHandler());
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Global variables

/**************************************************************************
 *                        Serve front-end contend
 ***************************************************************************/
// Set views
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static Files
app.use(express.static(join(__dirname, 'public')));

// 404
app.get('*', (req, res) => {
   const {
      output: { payload, statusCode },
      stack
   } = notFound();
   if (req.xhr || !req.accepts('html')) {
      res.status(statusCode).json(payload);
      return;
   } else {
      res.status(statusCode).render('error', { error: payload });
   }
   console.error(stack);
});

// Export express
export default app;
