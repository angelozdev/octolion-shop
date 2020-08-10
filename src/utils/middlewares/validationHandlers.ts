// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line no-unused-vars
import { ObjectSchema } from 'yup';
import { badRequest } from '@hapi/boom';

export type Check = 'body' | 'params';

export const validate = (schema: ObjectSchema, check: Check = 'body') => async (
   req: Request,
   _res: Response,
   next: NextFunction
) => {
   try {
      await schema.validate(req[check]);
      next();
   } catch (err) {
      next(badRequest(err));
   }
};
