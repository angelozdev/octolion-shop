// eslint-disable-next-line no-unused-vars
import { IProduct } from 'models/Products';

export const products = [
   {
      image:
         'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      _id: '5f162bdc44b93817f090589c',
      name: 'Headphones',
      price: 300,
      createdAt: '2020-07-20T23:42:20.215Z',
      updatedAt: '2020-07-20T23:42:20.215Z',
      __v: 0
   },
   {
      image:
         'https://images.unsplash.com/photo-1517423568366-8b83523034fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
      _id: '5f16f91eef4fa000b4615941',
      name: 'Yellow Hat',
      price: 10,
      createdAt: '2020-07-21T14:18:06.365Z',
      updatedAt: '2020-07-21T14:18:06.365Z',
      __v: 0
   },
   {
      image:
         'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80',
      _id: '5f17032e08c5600134849f93',
      name: 'Cup',
      price: 8,
      createdAt: '2020-07-21T15:01:02.779Z',
      updatedAt: '2020-07-21T15:06:25.309Z',
      __v: 0
   },
   {
      image:
         'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      _id: '5f1cad522f1c000613c7a51b',
      name: 'A Bag',
      price: 500,
      createdAt: '2020-07-25T22:08:18.091Z',
      updatedAt: '2020-08-10T16:07:59.431Z',
      __v: 0
   }
];

export default {
   getProducts: async (): Promise<Array<IProduct>> => {
      return await Promise.resolve(products);
   }
};
