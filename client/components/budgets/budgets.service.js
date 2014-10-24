'use strict';

angular.module('budgetApp')
  .factory('Budgets', function ($resource, User, Auth, BudgetCommunication, socket) {
    var budgets = [];

    function encodeBudget(budget) {
      var encodedBudget = {
        name : budget.name,
        info : budget.info,
        interval : budget.interval,
        intervaldata : [],
        _owner : Auth.getCurrentUser()._id,
        access : [],
        currencySymbol : "€",
      };
      encodedBudget.intervaldata.push({startdate: budget.startdate, budget: budget.budget});
      encodedBudget.access.push({_userid: Auth.getCurrentUser()._id});
      return encodedBudget;
    };

    function getBudgets( callback ) {
      var cb = callback || angular.noop;
      return BudgetCommunication.index(
          function(data) {
            return cb(data);
          },
          function(err) {
            return cb(err);
          }.bind(this)).$promise;
    }

    getBudgets().then(function(data) {
      budgets = data;
      socket.syncUpdates('budget', budgets);
    });

    return {

      getBudgets: function() {
        return budgets;
      },
      create: function(budget, callback) {
        var cb = callback || angular.noop;
        var budgetEncoded = encodeBudget(budget);

        return BudgetCommunication.save(budgetEncoded,
          function(data) {
            return cb(data);
          },
          function(err) {
            return cb(err);
          }.bind(this)).$promise;
      },
      delete: function(budget, callback) {
        var cb = callback || angular.noop;

        return BudgetCommunication.delete(budget,
          function(data) {
            return cb(data);
          },
          function(err) {
            return cb(err);
          }.bind(this)).$promise;
      },

    };
  });
