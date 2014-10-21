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

    $scope.booking = angular.copy($scope.defaultbooking);

    $scope.$watch(function () {
       return Budgets.getBudgets();
     },
      function(newVal, oldVal) {
        $scope.budgets = newVal;
    }, true);

    $http.get('/api/budgets').success(function(budgets) {
      $scope.budgets = budgets;
      socket.syncUpdates('budget', $scope.budgets);
    });

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    function removeTimeFromDate(date) {
      date.setMilliseconds(0);
      date.setSeconds(0);
      date.setMinutes(0);
      date.setHours(12);
    }

    $scope.addBooking = function() {
      if($scope.booking === '') {
        return;
      }
      removeTimeFromDate($scope.booking.bookingtime);
      $scope.booking.entrytime = new Date();
      $scope.booking.modificationtime = new Date();
      $scope.booking.addedby = $scope.getCurrentUser().name;
      $scope.booking.modifiedby = $scope.getCurrentUser().name;
      $scope.booking.value = parseFloat($scope.booking.value.replace(',', '.'));
      $http.post('/api/budgets', $scope.booking);
      $scope.booking = angular.copy($scope.defaultbooking);
    };

    $scope.deleteBooking = function(booking) {
      $http.delete('/api/budgets/' + booking._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('budget');
    });
  });
