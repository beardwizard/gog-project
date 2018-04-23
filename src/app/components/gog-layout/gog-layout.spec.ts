import * as angular from 'angular';
import 'angular-mocks';
import {gogLayout} from './gog-layout';

describe('gogLayout component', () => {
  beforeEach(() => {
    angular
      .module('gogLayout', ['app/components/gog-layout/gogLayout.html'])
      .component('gogLayout', gogLayout);
    angular.mock.module('gogLayout');
  });

  it('should...', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<gog-layout></gog-layout>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
