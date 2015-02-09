'use strict';

angular.module('budgetApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'btford.socket-io',
  'ui.router',
  'ngMaterial'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $mdThemingProvider.definePalette('marshfire-blue', {
      '50': 'deedf8',
      '100': 'bcdbf0',
      '200': '8abfe5',
      '300': '58a4da',
      '400': '3692d3',
      '500': '216697',
      '600': '1d5a86',
      '700': '123854',
      '800': '0f2d43',
      '900': '071721',
      'A100': '70c3ff',
      'A200': '33aaff',
      'A400': '008ff5',
      'A700': '00538f',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100', '200', 'A100', 'A200'],
      'contrastLightColors': undefined
    });
    $mdThemingProvider.definePalette('marshfire-orange', {
      '50': 'FBECDA',
      '100': 'F5CFA3',
      '200': 'F1BB7E',
      '300': 'EDA85A',
      '400': 'E99535',
      '500': 'DC8118',
      '600': 'B86B14',
      '700': '935610',
      '800': '6E400C',
      '900': '492B08',
      'A100': 'ff8a5c',
      'A200': 'ff7038',
      'A400': 'f54500',
      'A700': '8f2800',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100', '200', 'A100', 'A200'],
      'contrastLightColors': undefined
    });
    $mdThemingProvider.definePalette('marshfire-orange2', {
      '50': 'fef1ec',
      '100': 'fbd5c6',
      '200': 'f8b9a0',
      '300': 'f69d79',
      '400': 'f38153',
      '500': 'f0652d',
      '600': 'e54c10',
      '700': 'bf400d',
      '800': '99330b',
      '900': '722608',
      'A100': 'ff8a5c',
      'A200': 'ff7038',
      'A400': 'f54500',
      'A700': '8f2800',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': ['50', '100', '200', 'A100', 'A200'],
      'contrastLightColors': undefined
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('marshfire-blue', {'hue-1': '400'})
      .accentPalette('marshfire-orange', {'default': '400'});
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });
