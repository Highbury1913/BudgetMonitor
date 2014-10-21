'use strict';

angular.module('budgetApp')
  .factory('BudgetCommunication', function ($resource, Auth) {
    return $resource('/api/budgets/:id/:controller', {
      id: '@_id'
    },
    {
      index: {
        method: 'GET',
        params: {
          controller:'overview',
          id:Auth.getCurrentUser()._id
        },
        isArray: true
      },
      save: {
        method: 'POST',
        params: {}
      }
      // get: {
      //   method: 'GET',
      //   params: {
      //     id:'me'
      //   }
      // }
    });
  });
