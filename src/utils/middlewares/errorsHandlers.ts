import { Request, Response, NextFunction } from "express";
import { badImplementation, isBoom, Boom } from '@hapi/boom';



export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
   console.error(err.stack);
   next(err)
}

export const wrapErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
   if(!isBoom(err)) {
      next(badImplementation(err.name));
       return;
   }
   next(err)
}

export const clientErrorHandler = (err: Boom, req: Request, res: Response, next: NextFunction) => {
   const { output: { statusCode, payload } } = err;
   if(req.xhr || !req.accepts('html')) { // Cuando una API es laque hace la petición devuelve un json
      res.status(statusCode).json({ payload: { ...payload, stack: err.stack } });
      return
   }
   // Si no es una API contina pasando el error
   next(err)

}

export const errorHandler = (err: Boom, req: Request, res: Response, next: NextFunction) => {
   const { output: { payload, statusCode } } = err;

   res.status(statusCode).json(payload)
   res.render('error', { error: err })
}

