'use strict';

angular.module('budgetApp')
  .factory('Budgets', function ($resource, User, Auth, BudgetCommunication, socket) {
    var budgets = [],
      intervals = ['weekly', 'biweekly', 'daily', 'monthly', 'quarterly', 'yearly', 'once'],
      icons = ['gas', 'household', 'food'],
      defaultBudget = {
        name: '',
        info: '',
        icon: icons[0],
        interval: intervals[0],
        intervaldata: [{startdate: new Date(), budget: 100}],
        currencySymbol: '€',
      };

    function removeTimeFromDate(date) {
      date.setMilliseconds(0);
      date.setSeconds(0);
      date.setMinutes(0);
      date.setHours(12);
    }

    function encodeBudget(budget) {
      var encodedBudget = {
        name: budget.name,
        info: budget.info,
        icon: budget.icon,
        interval : budget.interval,
        intervaldata : [],
        _owner : Auth.getCurrentUser()._id,
        access : [],
        currencySymbol : '€',
      };
      removeTimeFromDate(budget.startdate);
      encodedBudget.intervaldata.push({startdate: budget.startdate, budget: budget.budget});
      encodedBudget.access.push({_userid: Auth.getCurrentUser()._id});
      return encodedBudget;
    }

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
      getIcons: function() {
        return icons;
      },

      getSupportedIntervals: function() {
        return intervals;
      },

      getDefaultBudget: function() {
        return angular.copy(defaultBudget);
      },

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
      update: function(budget, callback) {
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
