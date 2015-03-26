'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('POST /api/books', function() {
  it('should respond with 201 Created', function(done) {
    request(app)
      .post('/api/books')
      .send({title: 'test', author: 'test', isbn: 'test'})
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('title', 'test');
        res.body.should.have.property('author', 'test');
        res.body.should.have.property('isbn', 'test');
        done();
      });
  });

  it('should reject invalid POST bodies', function(done) {
    request(app)
      .post('/api/books')
      .send({invalid: 'test'})
      .expect(500)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('should reject empty POST bodies', function(done) {
    request(app)
      .post('/api/books')
      .expect(500)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /api/books', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/books')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});

