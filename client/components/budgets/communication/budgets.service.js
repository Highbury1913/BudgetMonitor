'use strict';

angular.module('budgetApp')
  .factory('Budgets', function ($resource, User, Auth, BudgetCommunication, socket) {
    var budgets = [],
      intervals = ['once', 'daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'],
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

    function getBudget( editableBudget ) {
      if ( editableBudget._id ) {
        for ( var idx in budgets ) {
          if (budgets[idx]._id === editableBudget._id)
          {
            return budgets[idx];
          }
        }
      }
      return angular.copy(defaultBudget);
    }

    function cropDate( date ) {
      var d = new Date(date);
      removeTimeFromDate(d);
      return d;
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
      transformToEditableBudget: function( budget ) {
        var editableBudget = {};
        if (budget._id) {
          editableBudget._id = budget._id;
        }
        editableBudget.name = budget.name;
        editableBudget.info = budget.info;
        editableBudget.icon = budget.icon;
        editableBudget.interval = budget.interval;
        editableBudget.currencySymbol = budget.currencySymbol;
        editableBudget.startdate = new Date(budget.latestBudget.startdate);
        editableBudget.budget = budget.latestBudget.budget;

        return editableBudget;
      },

      transformFromEditableBudget: function( editableBudget ) {
        var originalBudget = getBudget( editableBudget );
        var newDate = cropDate( editableBudget.startdate );
        var originalDate = cropDate( originalBudget.latestBudget.startdate);
        if (newDate !== originalDate) {
          originalBudget.intervaldata.push({startdate: newDate, budget: editableBudget.budget});
        } else {
          originalBudget.intervaldata[originalBudget.intervaldata.length-1].budget = editableBudget.budget;
        }

        originalBudget.name = editableBudget.name;
        originalBudget.info = editableBudget.info;
        originalBudget.icon = editableBudget.icon;
        originalBudget.interval = editableBudget.interval;
        originalBudget.currencySymbol = editableBudget.currencySymbol;

        return originalBudget;
      },

      getIcons: function() {
        return icons;
      },

      getIntervals: function() {
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

        return BudgetCommunication.update(budget,
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
