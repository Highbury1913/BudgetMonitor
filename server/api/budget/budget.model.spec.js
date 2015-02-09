'use strict';

var should = require('should');
var app = require('../../app');
var User = require('../user/user.model');
var Budget = require('./budget.model');

var user;

describe('Budget Model', function () {
  beforeEach(function (done) {
    // get a user
    User.find({}, '', function (err, users) {
      user = users[0];
      done();
    });
  })

  beforeEach(function (done) {
    // Clear budgets before testing
    Budget.remove().exec().then(function () {
      done();
    });
  });

  afterEach(function (done) {
    Budget.remove().exec().then(function () {
      done();
    });
  });

  it('should begin with no budgets', function (done) {
    Budget.find({}, function (err, budgets) {
      budgets.should.have.length(0);
      done();
    });
  });

  it('should be equipped with valid test users', function (done) {
    User.find({}, function (err, users) {
      users.should.have.length(2);
      done();
    });
  });

  it('should have a budget after adding', function (done) {
    var budget = new Budget({
      name: 'FakeBudget',
      info: 'A fake budget for testing',
      icon: 'testicon.svg',
      _owner: user._id,
      access: [{
        _userid: user._id
      }],
      interval: 'weekly',
      intervaldata: [{
        startdate: new Date("2014-01-01"),
        budget: 123.45
      }],
    });

    budget.save(function (err) {
      should.not.exist(err);
      Budget.find({}, function (err, budgets) {
        budgets.should.have.length(1);
        done();
      });
    });
  });

  it('should not accept budgets without an owner', function (done) {
    var budget = new Budget({
      name: 'FakeBudget',
      info: 'A fake budget for testing',
      icon: 'testicon.svg',
      access: [{
        _userid: user._id
      }],
      interval: 'weekly',
      intervaldata: [{
        startdate: new Date("2014-01-01"),
        budget: 123.45
      }],
    });

    budget.save(function (err) {
      should.exist(err);
      done();
    });
  });

  it('should not accept budgets without an access list', function (done) {
    var budget = new Budget({
      name: 'FakeBudget',
      info: 'A fake budget for testing',
      icon: 'testicon.svg',
      _owner: user._id,
      interval: 'weekly',
      intervaldata: [{
        startdate: new Date("2014-01-01"),
        budget: 123.45
      }],
    });

    budget.save(function (err) {
      should.exist(err);
      done();
    });
  });

  it('should not accept budgets without a valid user in access list', function (done) {
    var budget = new Budget({
      name: 'FakeBudget',
      info: 'A fake budget for testing',
      icon: 'testicon.svg',
      _owner: user._id,
      access: [],
      interval: 'weekly',
      intervaldata: [{
        startdate: new Date("2014-01-01"),
        budget: 123.45
      }],
    });

    budget.save(function (err) {
      should.exist(err);
      done();
    });
  });

  describe('Current budget virtual', function () {
    it('should deliver the latest budget', function (done) {
      var budget = new Budget({
        name: 'FakeBudget',
        info: 'A fake budget for testing',
        icon: 'testicon.svg',
        _owner: user._id,
        access: [{
          _userid: user._id
        }],
        interval: 'weekly',
        intervaldata: [{
          startdate: new Date("2014-01-01"),
          budget: 123.45
        }, {
          startdate: new Date("2014-01-02"),
          budget: 543.21
        }],
      });

      budget.save(function (err) {
        Budget.find({}, function (err, budgets) {
          budgets[0].latestBudget.startdate.should.eql(new Date("2014-01-02"));
          budgets[0].latestBudget.budget.should.eql(543.21);
          done();
        });
      });
    });
  });

  // it('should fail when saving a duplicate user', function(done) {
  //   user.save(function() {
  //     var userDup = new User(user);
  //     userDup.save(function(err) {
  //       should.exist(err);
  //       done();
  //     });
  //   });
  // });

  // it('should fail when saving without an email', function(done) {
  //   user.email = '';
  //   user.save(function(err) {
  //     should.exist(err);
  //     done();
  //   });
  // });

  // it("should authenticate user if password is valid", function() {
  //   return user.authenticate('password').should.be.true;
  // });

  // it("should not authenticate user if password is invalid", function() {
  //   return user.authenticate('blah').should.not.be.true;
  // });
});
