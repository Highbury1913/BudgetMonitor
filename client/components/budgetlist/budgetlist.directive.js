'use strict';

angular.module('budgetApp')
  .directive('budgetlist', function ($http, Budgets, Modal) {
    return {
      templateUrl: 'components/budgetlist/budgetlist.html',
      scope: {
        budgets: '=',
      },
      restrict: 'E',
      link: function (scope) {
        scope.predicate = '-value';
        scope.deleteBudget = Modal.confirm.delete( function(budget) {
          Budgets.delete(budget);
        });
      }
    };
  });
