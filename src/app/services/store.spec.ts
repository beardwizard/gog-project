import * as angular from 'angular';
import 'angular-mocks';
import Store from './store';

describe('Store service', () => {
  beforeEach(() => {
    angular
      .module('Store', [])
      .service('Store', Store);
    angular.mock.module('Store');
  });

  // it('should', angular.mock.inject((Store: Store) => {
  //   expect(Store.getData()).toEqual(3);
  // }));
});
