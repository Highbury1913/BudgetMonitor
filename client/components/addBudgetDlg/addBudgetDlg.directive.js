'use strict';

angular.module('budgetApp')
  .directive('addBudgetDlg', function () {
    return {
      templateUrl: 'components/addBudgetDlg/addBudgetDlg.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });