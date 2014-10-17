'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var User = require('../user/user.model');
var Budget = require('./budget.model');

describe('GET /api/budgets', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/budgets')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });

  it('should contain 2 test data entries', function(done) {
    request(app)
      .get('/api/budgets')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.length.should.eql(2);
        done();
      });
  });

});
