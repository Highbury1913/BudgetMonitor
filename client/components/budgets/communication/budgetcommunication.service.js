'use strict';

angular.module('budgetApp')
  .factory('BudgetCommunication', function ($resource, Auth) {
    return $resource('/api/budgets/:path/:id/:controller', {
      id: '@_id'
    },
    {
      index: {
        method: 'GET',
        params: {
          path:'access',
          id:Auth.getCurrentUser()._id
        },
        isArray: true
      },
      save: {
        method: 'POST',
        params: {}
      },
      update: {
        method: 'PUT',
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
