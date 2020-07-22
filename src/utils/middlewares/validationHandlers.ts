import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

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
         next(err)
      }
   }
)
