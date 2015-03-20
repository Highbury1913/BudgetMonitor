'use strict';

describe('Controller: BudgeteditorCtrl', function() {

  // load the controller's module
  beforeEach(module('budgetApp'));

  var BudgeteditorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    BudgeteditorCtrl = $controller('BudgeteditorCtrl', {
      $scope: scope
    });
  }));

  // it('should ...', function () {
  //   expect(1).toEqual(1);
  // });
});
