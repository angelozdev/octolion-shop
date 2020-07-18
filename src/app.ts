import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { join } from 'path';

import userRoutes from './routes/user.routes';

// Init express
const app: Application = express();
dotenv.config()


/*******************************************************************
*                               Set express
*********************************************************************/


// settings
console.log(process.env.NODE_ENV)

// Middlewares
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
   res.render('index', { title: "Hello world with Express" })
})

app.use('/products', userRoutes)

// Global variables




/**************************************************************************
*                        Serve front-end contend
***************************************************************************/
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static(join(__dirname, 'public')))
app.get('*', (req: Request, res: Response) => {
   res.sendStatus(404)
})

// Export express
export default app;