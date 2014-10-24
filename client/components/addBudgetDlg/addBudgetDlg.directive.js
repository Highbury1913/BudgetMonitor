'use strict';

// angular.module('budgetApp')
//   .directive('addBudgetDlg', function () {
//     return {
//       templateUrl: 'components/addBudgetDlg/addBudgetDlg.html',
//       restrict: 'EA',
//       link: function (scope, element, attrs) {
//       }
//     };
//   });

angular.module('budgetApp')
  .controller('dialogCtrl',function($scope,dialogs,Budgets){
    //== Variables ==//
    $scope.budget = {
      name: '',
      info: '',
      interval: 'Wöchentlich',
      startdate:new Date(),
      budget: 100.00,
      currencySymbol: '€'
    };

    //== Methods ==//
    $scope.launchBudgetDlg = function(){
      var dlg = dialogs.create('/components/addBudgetDlg/addBudgetDlg.html','budgetDlgCtrl',angular.copy($scope.budget));
      dlg.result.then(function(data){
        Budgets.create(data);
      });
    }; // end launch
  }) // end dialogTest

  .controller('budgetDlgCtrl',function($log,$scope,$modalInstance,data){
    $scope.data = data;
    $scope.opened = false;

    //== Listeners ==//
    $scope.$watch('data.startdate',function(val,old){
      $log.info('Date Changed: ' + val);
      $scope.opened = false;
    });

    //== Methods ==//
    $scope.setDate = function(){
      if(!angular.isDefined($scope.data.startdate))
        $scope.data.startdate = new Date(); // today
    };
    $scope.setDate();

    $scope.open = function($event){
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    }; // end open

    $scope.done = function(){
      $modalInstance.close($scope.data);
    }; // end done

    $scope.cancel = function(){
      $modalInstance.dismiss('Canceled');
    }; // end done
  }) // end customDialogCtrl

  .config(function(dialogsProvider){
    // this provider is only available in the 4.0.0+ versions of angular-dialog-service
    dialogsProvider.useBackdrop(true);
    dialogsProvider.useEscClose(true);
    dialogsProvider.useCopy(false);
    // dialogsProvider.setSize('sm');
  }) // end config
