import * as angular from 'angular';
import 'angular-mocks';
import {cart} from './cart';

describe('cart component', () => {
  beforeEach(() => {
    angular
      .module('cart', ['app/components/cart/cart.html'])
      .component('cart', cart);
    angular.mock.module('cart');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<cart></cart>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
