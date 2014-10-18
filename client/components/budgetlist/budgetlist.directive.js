'use strict';

angular.module('budgetApp')
  .directive('budgetlist', function ($http) {
    return {
      templateUrl: 'components/budgetlist/budgetlist.html',
      scope: {
        budgets: '=',
      },
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.predicate = '-value';
        scope.deleteBudget = function(budget) {
          $http.delete('/api/budgets/' + budget._id);
        }
      }
    };
  });
