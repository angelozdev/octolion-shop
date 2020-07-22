import { Router, Response, Request, NextFunction } from 'express';
import { getProducts } from '../../services/product.service';
import { IProduct } from '../../models/Products';
const router: Router = Router();



router.get('/', async (req: Request, res: Response, next: NextFunction) => {
   try {
      /* throw new Error('This is an error') */
      const products: Array<IProduct> = await getProducts()
      res.render('products/index', { products, title: "Express | Products" })
   } catch (err) {
      next(err)
   }
})


export default router;