// eslint-disable-next-line no-unused-vars
import { Response } from 'express';
import { config } from '../../config';

export const FIVE_MINUTES: number = 300;
export const ONE_HOUR: number = 3600;

export const cacheResponse = (res: Response, seconds: number) => {
   if (!config.DEV) {
      res.set('Cache-Control', `public, max-age=${seconds}`);
   }
};
