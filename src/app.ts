import express, { Application, Request, Response } from 'express';


// Initializations
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares

// Routes
app.get('/', (req: Request, res: Response) => {
   res.json({greet: "Hola Mundo"})
})

// Global variables

// Static Files


export default app;