'use strict';

describe('Service: sessiondata', function() {

  // load the service's module
  beforeEach(module('budgetApp'));

  // instantiate service
  var sessiondata;
  beforeEach(inject(function(_sessiondata_) {
    sessiondata = _sessiondata_;
  }));

  it('should initially have no selected budget', function() {
    expect(sessiondata.getCurrentBudget()).toEqual({});
  });

  it('should initially have no selected booking', function() {
    expect(sessiondata.getCurrentBooking()).toEqual({});
  });

  it('should return the current budget after setting one', function() {
    var budget1 = {
      name: "1"
    };
    sessiondata.setCurrentBudget(budget1);
    expect(sessiondata.getCurrentBudget()).toBe(budget1);
  });

  it('should return the latest budget after setting it twice', function() {
    var budget1 = {
      name: "1"
    };
    var budget2 = {
      name: "2"
    };
    sessiondata.setCurrentBudget(budget1);
    sessiondata.setCurrentBudget(budget2);
    expect(sessiondata.getCurrentBudget()).toBe(budget2);
  });

  it('should return the current booking after setting one', function() {
    var booking1 = {
      name: "1"
    };
    sessiondata.setCurrentBooking(booking1);
    expect(sessiondata.getCurrentBooking()).toBe(booking1);
  });

  it('should return the latest budget after setting it twice', function() {
    var booking1 = {
      name: "1"
    };
    var booking2 = {
      name: "2"
    };
    sessiondata.setCurrentBooking(booking1);
    sessiondata.setCurrentBooking(booking2);
    expect(sessiondata.getCurrentBooking()).toBe(booking2);
  });

});
