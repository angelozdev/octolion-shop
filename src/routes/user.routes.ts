import { Router, Response, Request } from 'express';
import axios, { AxiosResponse } from 'axios';

const router: Router = Router();
const API: string = 'https://jsonplaceholder.typicode.com/users'

interface IUser {
   id     : number,
   name   : string,
   email  : string,
   address: {
      street : string,
      suite  : string,
      city   : string,
      zipcode: string,
      geo: {
         lat: string,
         lng: string
      }
   },
   phone  : string,
   website: string,
   company: {
      name       : string,
      catchPhrase: string,
      bs         : string
   }
}

router.get('/', async (req: Request, res: Response) => {
   const { data }: AxiosResponse<Array<IUser>> = await axios.get(API)
   res.json(data)
})


export default router;