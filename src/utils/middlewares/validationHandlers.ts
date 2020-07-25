import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";
import { badRequest } from '@hapi/boom';

export enum reqCheck {
   body = "body",
   params = "params"
}

export const validate = (schema: ObjectSchema, check: reqCheck = reqCheck["body"]) => (
   async (req: Request, _res: Response, next: NextFunction) => {
      try {
         await schema.validate(req[check])
         next()
      } catch (err) {
         next(badRequest(err))
      }
   }
)
