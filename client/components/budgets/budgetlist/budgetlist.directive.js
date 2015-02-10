'use strict';

angular.module('budgetApp')
  .directive('budgetlist', function ($http, Budgets, Auth, $timeout, $mdBottomSheet, $mdDialog, sessiondata) {
    return {
      templateUrl: 'components/budgets/budgetlist/budgetlist.html',
      scope: {
        budgets: '=',
      },
      restrict: 'E',
      link: function (scope) {
        function confirmDelete(ev) {

          var confirm = $mdDialog.confirm()
            .title('Would you like to delete "' + sessiondata.getCurrentBudget().name + '"?')
            .content('Please confirm that you want to delete the budget. This action cannot be undone.')
            .ariaLabel('Delete budget confirmation')
            .ok('delete it')
            .cancel('cancel')
            .targetEvent(ev);
          $mdDialog.show(confirm).then(function() {
            Budgets.delete(sessiondata.getCurrentBudget());
          }, function() {

          });
        }

        scope.alert = '';
        scope.predicate = '-value';
        scope.getCurrentUser = Auth.getCurrentUser;

        scope.showBottomSheet = function($event, budget) {
          scope.alert = '';
          sessiondata.setCurrentBudget( budget );

          $mdBottomSheet.show({
            templateUrl: '/components/budgets/budgetlist/budgetmenu.html',
            controller: 'BudgetBottomSheetCtrl',
            targetEvent: $event,
          }).then( function(clickedItem, ev) {
            switch (clickedItem.name) {
              case 'delete':
                confirmDelete(ev);
                break;
              default:
                break;
            }
          });
        };
      }
    };

  });
