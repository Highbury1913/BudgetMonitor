'use strict';

angular.module('budgetApp')
  .directive('budgetlist', function ($http, Budgets, Modal, dialogs, Auth) {
    return {
      templateUrl: 'components/budgetlist/budgetlist.html',
      scope: {
        budgets: '=',
      },
      restrict: 'E',
      link: function (scope) {
        scope.predicate = '-value';
        scope.getCurrentUser = Auth.getCurrentUser;
        scope.deleteBudget = Modal.confirm.delete( function(budget) {
          Budgets.delete(budget);
        });
        scope.editBudget = function(budget){
          var dlg = dialogs.create('/components/addBudgetDlg/addBudgetDlg.html','budgetDlgCtrl',budget);
          dlg.result.then(function(data){
            Budgets.update(data);
          });
        }; // end launch

      }
    };
  });
