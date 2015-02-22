'use strict';

angular.module('budgetApp')
  .directive('rsBar', function () {
    return {
      templateUrl: 'components/rs-bar/rs-bar.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });