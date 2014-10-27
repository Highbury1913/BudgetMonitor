'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var seed = require('../../config/seed');

var User = require('../user/user.model');
var Budget = require('./budget.model');


var user1, user2;

describe('GET /api/budgets', function() {
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
