'use strict';

angular.module('budgetApp')
  .directive('budgetlist', function($http, Budgets, Auth, $timeout, $mdBottomSheet, $mdDialog, sessiondata) {
    return {
      templateUrl: 'components/budgets/budgetlist/budgetlist.html',
      scope: {
        budgets: '=',
      },
      restrict: 'E',
      link: function(scope) {
        scope.showBottomSheet = function($event, budget) {
          sessiondata.setCurrentBudget(budget);

          $mdBottomSheet.show({
            templateUrl: '/components/budgets/budgeteditor/budgetmenu.html',
            controller: 'BudgetEditorCtrl',
            targetEvent: $event,
          });
        };
      }
    };

  });
