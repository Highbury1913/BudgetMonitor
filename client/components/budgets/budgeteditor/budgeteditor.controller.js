'use strict';

angular.module('budgetApp')
  .controller('BudgeteditorCtrl', function($scope, $mdDialog) {
    $scope.showBudgetEditor = function(event) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('This is an alert title')
          .content('You can specify some description text in here.')
          .ariaLabel('Password notification')
          .ok('Got it!')
          .targetEvent(event)
        );
      };
    });
