import { Request, Response, NextFunction } from "express";

export const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
   console.log(err.stack);
   next(err)
}

export const clientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
   console.log("Client Error Handler", req.xhr)
   if(req.xhr) {
      res.status(500).json({ error: err.message })
   }else {
      next(err)
   }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
   console.log("Error Handler", res.headersSent)
   if(res.headersSent) {
      next(err)
   }
   res.status(req.statusCode || 500)
   res.render('error', { error: err })
}

