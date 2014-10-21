'use strict';

angular.module('budgetApp')
  .factory('Budgets', function ($resource, User) {
    var budgets = [];

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      addBudget: function(budget) {
        budgets.push(budget);
      },
      getBudgets: function() {
        return budgets;
      }
    };
  });
