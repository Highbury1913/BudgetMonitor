'use strict';

describe('Service: budgets', function() {

  // load the service's module
  beforeEach(module('budgetApp'));

  // instantiate service
  var budgets;
  beforeEach(inject(function(Budgets) {
    budgets = Budgets.getBudgets();
  }));

  // it('should do something', function () {
  //   expect(!!budgets).toBe(true);
  // });

});
