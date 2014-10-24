'use strict';

angular.module('budgetApp')
  .directive('budgetlist', function ($http, Budgets) {
    return {
      templateUrl: 'components/budgetlist/budgetlist.html',
      scope: {
        budgets: '=',
      },
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.predicate = '-value';
        scope.deleteBudget = function(budget) {
          Budgets.delete(budget);
        }
      }
    };
  });
