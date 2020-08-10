// eslint-disable-next-line no-unused-vars
import { Router, Response, Request, NextFunction } from 'express';
import { getProducts } from '../../services/product.service';
// eslint-disable-next-line no-unused-vars
import { IProduct } from '../../models/Products';
import { cacheResponse, FIVE_MINUTES } from '../../utils/cache/cacheResponse';
const router: Router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
   cacheResponse(res, FIVE_MINUTES);
   try {
      /* throw new Error('This is an error'); */
      const products: Array<IProduct> = await getProducts();
      res.render('products/index', { products, title: 'Express | Products' });
   } catch (err) {
      next(err);
   }
});

export default router;
