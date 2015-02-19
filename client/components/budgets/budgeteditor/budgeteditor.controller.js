'use strict';

function BudgetDialogCtrl($scope, $mdDialog) {
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

angular.module('budgetApp')
  .controller('BudgeteditorCtrl', function($scope, $mdDialog, Budgets) {
    //$scope.budget = { budget: "200", startdate: new Date(), interval: "Weekly" };
    var defaultbudget = Budgets.getDefaultBudget();
    $scope.budget = {
      name: defaultbudget.name,
      info: defaultbudget.info,
      interval: defaultbudget.interval,
      icon: defaultbudget.icon,
      startdate: defaultbudget.intervaldata[0].startdate,
      budget: defaultbudget.intervaldata[0].budget,
      currencySymbol: defaultbudget.currencySymbol
    }
    $scope.showBudgetEditor = function(event, style) {
      if (style === 'new') {
        $mdDialog.show(
          $mdDialog.alert()
            .title('This is an alert title')
            .content('You can specify some description text in here.')
            .ariaLabel('Password notification')
            .ok('Got it!')
            .targetEvent(event)
        );
      } else {
        $mdDialog.show({
          controller: BudgetDialogCtrl,
          templateUrl: 'components/budgets/budgeteditor/budgeteditor.html',
          targetEvent: event,
        })
        .then(function(budget) {
          console.log(budget);
        }, function() {
          console.log('canceled');
        });
      }
    };
  });
