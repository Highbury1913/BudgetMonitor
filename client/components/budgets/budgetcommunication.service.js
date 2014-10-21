'use strict';

angular.module('budgetApp')
  .factory('BudgetCommunication', function ($resource, User) {
    return $resource('/api/budgets/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
    });
  });
