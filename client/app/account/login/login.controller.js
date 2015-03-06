'use strict';

angular.module('budgetApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
            if (err.message.indexOf("email") > -1) {
              form['email'].$setValidity('mongoose', false);
              $scope.errors['email'] = err.message;
            }
            else if (err.message.indexOf("password") > -1) {
              form['password'].$setValidity('mongoose', false);
              $scope.errors['password'] = err.message;
            };
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
