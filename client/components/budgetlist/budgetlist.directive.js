'use strict';

angular.module('budgetApp')
  .directive('budgetlist', function ($http) {
    return {
      templateUrl: 'components/budgetlist/budgetlist.html',
      scope: {
        bookings: '=',
      },
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.predicate = '-value';
        scope.deleteBooking = function(booking) {
          $http.delete('/api/budgets/' + booking._id);
        }
      }
    };
  });
