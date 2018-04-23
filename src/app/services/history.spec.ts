import * as angular from 'angular';
import 'angular-mocks';
import History from './history';

describe('History service', () => {
  beforeEach(() => {
    angular
      .module('History', [])
      .service('History', History);
    angular.mock.module('History');
  });

  // it('should', angular.mock.inject((History: History) => {
  //   expect(History.getData()).toEqual(3);
  // }));
});
