import * as angular from 'angular';
import 'angular-mocks';
import {productPrice} from './product-price';

describe('productPrice component', () => {
  beforeEach(() => {
    angular
      .module('productPrice', ['app/components/product-price/product-price.html'])
      .component('productPrice', productPrice);
    angular.mock.module('productPrice');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<product-price></product-price>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
