import * as angular from 'angular';
import 'angular-mocks';
import {productList} from './product-list';

describe('productList component', () => {
  beforeEach(() => {
    angular
      .module('productList', ['app/components/product-list/product-list.html'])
      .component('productList', productList);
    angular.mock.module('productList');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<product-list></product-list>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
