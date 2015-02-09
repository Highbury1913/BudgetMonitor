'use strict';

angular.module('budgetApp')
  .directive('budgetlist', function ($http, Budgets, Auth, $timeout, $mdBottomSheet, sessiondata) {
    return {
      templateUrl: 'components/budgets/budgetlist/budgetlist.html',
      scope: {
        budgets: '=',
      },
      restrict: 'E',
      link: function (scope) {
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
          }).then( function(clickedItem) {
            scope.alert = clickedItem.name + ' clicked';
          });
        }
        // scope.deleteBudget = Modal.confirm.delete( function(budget) {
        //   Budgets.delete(budget);
        // });
        // scope.editBudget = function(budget){
        //   var dlg = dialogs.create('/components/addBudgetDlg/addBudgetDlg.html','budgetDlgCtrl',budget);
        //   dlg.result.then(function(data){
        //     Budgets.update(data);
        //   });
        // }; // end launch

      }
    }

  });
