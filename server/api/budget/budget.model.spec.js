'use strict';

var should = require('should');
var app = require('../../app');
var User = require('../user/user.model');
var Budget = require('./budget.model');

var user = new User({
  provider: 'local',
  name: 'Fake User',
  email: 'test@test.com',
  password: 'password'
});

describe('Budget Model', function () {
  before(function (done) {
    // Clear users before testing
    User.remove().exec().then(function () {
      user.save(function () {
        done();
      });
    });
  });

  after(function (done) {
    User.remove().exec().then(function () {
      done();
    });
  });

  before(function (done) {
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

  it('should be equipped with a valid test user', function (done) {
    User.find({}, function (err, users) {
      users.should.have.length(1);
      done();
    });
  });

  it('should have a budget after adding', function (done) {
    var budget = new Budget({
      name: 'FakeBudget',
      info: 'A fake budget for testing',
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
