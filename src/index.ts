import * as angular from 'angular';

import 'angular-ui-router';
import routesConfig from './routes';

import { productPrice } from './app/components/product-price/product-price';
import { product } from './app/components/product/product';
import { productList } from './app/components/product-list/product-list';
import { gogLayout } from './app/components/gog-layout/gog-layout';
import { cartItem } from './app/components/cart-item/cart-item';
import { cart } from './app/components/cart/cart';
import Store from './app/services/store';
import Cart from './app/services/cart';
import History from './app/services/history';

import './index.scss';

export const app: string = 'app';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('gogLayout', gogLayout)
  .component('cart', cart)
  .component('cartItem', cartItem)
  .component('productList', productList)
  .component('product', product)
  .component('productPrice', productPrice)
  .service('Store', Store)
  .service('Cart', Cart)
  .service('History', History);
