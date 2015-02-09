'use strict';

angular.module('budgetApp')
.controller('BudgetBottomSheetCtrl', function($scope, $mdBottomSheet, sessiondata) {
    $scope.items = [
      { name: 'Edit', icon: 'edit' },
      { name: 'delete', icon: 'delete' },
    ];
    $scope.budget = sessiondata.getCurrentBudget();
    $scope.listItemClick = function($index) {
      var clickedItem = $scope.items[$index];
      $mdBottomSheet.hide(clickedItem);
    };
  });
