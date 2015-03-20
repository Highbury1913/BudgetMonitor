'use strict';

angular.module('budgetApp')
  .service('sessiondata', function() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var currentBudget = {};
    var currentBooking = {};

    return {
      setCurrentBudget: function(budget) {
        currentBudget = budget;
      },

      getCurrentBudget: function() {
        return currentBudget;
      },

      setCurrentBooking: function(booking) {
        currentBooking = booking;
      },

      getCurrentBooking: function() {
        return currentBooking;
      }

    };
  });
