import * as angular from 'angular';
import 'angular-mocks';
import Cart from './cart';

describe('Cart service', () => {
  beforeEach(() => {
    angular
      .module('Cart', [])
      .service('Cart', Cart);
    angular.mock.module('Cart');
  });

  // it('should', angular.mock.inject((Cart: Cart) => {
  //   expect(Cart.getData()).toEqual(3);
  // }));
});
