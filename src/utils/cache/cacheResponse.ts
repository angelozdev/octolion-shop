import { Response } from "express";

export const FIVE_MINUTES: number = 300;
export const ONE_HOUR: number = 3600;

export const cacheResponse = (res: Response, seconds: number) => {
   if(process.env.NODE_ENV === "production"){
      res.set('Cache-Control', `public, max-age=${seconds}`)
   }
}