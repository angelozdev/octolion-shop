import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { join } from 'path';
import * as Sentry from '@sentry/node';

import productRoutes from './routes/views/product.routes';
import productApiRoutes from './routes/api/product.routes';

import { clientErrorHandler, errorHandler, logErrors } from './utils/middlewares/errorsHandlers'

// Init express
const app: Application = express();
dotenv.config()
Sentry.init({ dsn: process.env.SENTRY_DNS })


/*******************************************************************
*                               Set express
*********************************************************************/


// settings

// Middlewares
app.use(Sentry.Handlers.requestHandler())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/me', (req: Request, res: Response) => {
   res.json({
      username: "angelozdev",
      name    : "Angelo Zambrano",
      age     : 22,
      twitter : "@angelozdev",
      github  : "https://github.com/angelozdev"
   })
})
app.get('/', (req: Request, res: Response) => {
   res.render('index', { title: "Express | Home" })
})
app.use('/products', productRoutes);
app.use('/api/products', productApiRoutes)


// Error Handlers
app.use(Sentry.Handlers.errorHandler())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

// Global variables




/**************************************************************************
*                        Serve front-end contend
***************************************************************************/
// Set views
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')

// Static Files
app.use(express.static(join(__dirname, 'public')))

// 404
app.get('*', (req: Request, res: Response) => {
   res.sendStatus(404)
})

// Export express
export default app;