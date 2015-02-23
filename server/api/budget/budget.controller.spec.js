'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var seed = require('../../config/seed');

var User = require('../user/user.model');
var Budget = require('./budget.model');


var user1, user2;
var budget1, budget2;

describe('/api/budgets', function() {
  before(function(done) {
    seed.seedBudget(done);
  })

  beforeEach(function (done) {
    // get a user
    User.find({}, '', function (err, users) {
      user1 = users[0];
      user2 = users[1];
      done();
    });
  })

  beforeEach(function (done) {
    // get a user
    Budget.find({}, '', function (err, budgets) {
      budget1 = budgets[0];
      budget2 = budgets[1];
      done();
    });
  })

  describe('GET request', function() {
    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/budgets/owner/'+user1._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it('should contain 1 test data entries owned by user1', function(done) {
      request(app)
        .get('/api/budgets/owner/'+user1._id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.length.should.eql(1);
          done();
        });
    });

    it('should contain 1 test data entries owned by user2', function(done) {
      request(app)
        .get('/api/budgets/owner/'+user2._id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.length.should.eql(1);
          done();
        });
    });

    it('should contain 2 test data entries shared with user1', function(done) {
      request(app)
        .get('/api/budgets/access/'+user1._id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.length.should.eql(2);
          done();
        });
    });
  });

  describe('PUT request', function() {

    it('should respond with JSON object on request', function(done) {
      request(app)
        .put('/api/budgets/'+budget1._id)
        .send(budget1)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          res.body.intervaldata.length.should.equal(2);
          res.body.latestBudget.budget.should.equal(543.21);
          done();
        });
    });

    it('should refuse to update an unknown budget', function(done) {
      request(app)
        .put('/api/budgets/'+budget2._id)
        .send(budget2)
        .expect(404)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('should update a budget', function(done) {
      var budget_copy = JSON.parse(JSON.stringify(budget1));
      budget_copy = { startdate: new Date("2014-01-03"), budget: 6543.21};
      request(app)
        .put('/api/budgets/'+budget1._id)
        .send(budget_copy)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.latestBudget.budget.should.equal(6543.21);
          done();
        });
    });


  });

});



