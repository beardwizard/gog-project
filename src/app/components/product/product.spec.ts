import * as angular from 'angular';
import 'angular-mocks';
import {product} from './product';

describe('product component', () => {
  beforeEach(() => {
    angular
      .module('product', ['app/components/product/product.html'])
      .component('product', product);
    angular.mock.module('product');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<product></product>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
