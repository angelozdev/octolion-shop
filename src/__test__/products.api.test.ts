import supertest from 'supertest';
import app from '../app';

describe('Routes - Api - Products', () => {
   describe('GET /products', () => {
      it('should respond with statusCode 200', async () => {
         const res = await supertest(app).get('/api/products');
         return expect(res.status).toBe(200);
      }, 10000);
   });
});
