'use strict';

angular.module('budgetApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, Budgets) {
    $scope.budgets = Budgets.getBudgets();
    $scope.opened = false;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.defaultbooking = {
      bookingtime: new Date(),
      name: '',
      necessity: 'Entscheidung',
      category: 'Lebensmittel',
      budgettype: 'Allgemein',
      value: ''
    };

    $scope.$watch(function () {
       return Budgets.getBudgets();
     },
      function(newVal) {
        $scope.budgets = newVal;
    }, true);

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('budget');
    });
  });
