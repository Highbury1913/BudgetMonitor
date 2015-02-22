'use strict';

function BudgetCreationDialogCtrl($scope, $mdDialog, Budgets) {
  var defaultbudget = Budgets.getDefaultBudget();
  $scope.action='Create budget';
  $scope.budget = {
    name: defaultbudget.name,
    info: defaultbudget.info,
    interval: defaultbudget.interval,
    icon: defaultbudget.icon,
    startdate: defaultbudget.intervaldata[0].startdate,
    budget: defaultbudget.intervaldata[0].budget,
    currencySymbol: defaultbudget.currencySymbol
  };
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

function BudgetEditingDialogCtrl($scope, $mdDialog, sessiondata, $mdBottomSheet, Budgets) {
  $mdBottomSheet.hide();
  var currentBudget = sessiondata.getCurrentBudget();
  $scope.action='Save';
  $scope.budget = Budgets.transformToEditableBudget(currentBudget);

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(editedBudget) {
    $mdDialog.hide(Budgets.transformFromEditableBudget(editedBudget));
  };
}

angular.module('budgetApp')
  .controller('BudgetEditorCtrl', function($scope, $mdDialog, Budgets, sessiondata, $mdBottomSheet) {
    $scope.action = '';
    $scope.budget = {};
    $scope.currentBudget = sessiondata.getCurrentBudget();

    function createBudget(budget) {
      Budgets.create(budget);
    }

    function updateBudget(budget) {
      Budgets.update(budget);
    }

    $scope.confirmDelete = function(ev) {
      $mdBottomSheet.hide();

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
    };


    $scope.showBudgetEditor = function(event, style) {
      if (style === 'new') {
        $mdDialog.show({
          controller: BudgetCreationDialogCtrl,
          templateUrl: 'components/budgets/budgeteditor/budgeteditor.html',
          targetEvent: event,
        })
        .then(function(budget) {
          createBudget(budget);
        }, function() {
          console.log('canceled');
        });
      } else {
        $mdDialog.show({
          controller: BudgetEditingDialogCtrl,
          templateUrl: 'components/budgets/budgeteditor/budgeteditor.html',
          targetEvent: event,
        })
        .then(function(budget) {
          updateBudget(budget);
        }, function() {
          console.log('canceled');
        });
      }
    };
  });
