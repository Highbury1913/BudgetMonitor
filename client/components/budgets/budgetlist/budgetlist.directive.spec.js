'use strict';

describe('Directive: budgetlist', function () {

  // load the directive's module and view
  beforeEach(module('budgetApp'));
  beforeEach(module('components/budgetlist/budgetlist.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  // it('should make hidden element visible', inject(function ($compile) {
  //   element = angular.element('<budgetlist></budgetlist>');
  //   element = $compile(element)(scope);
  //   scope.$apply();
  //  // expect(element.text()).toBe('this is the budgetlist directive');
  // }));
});
