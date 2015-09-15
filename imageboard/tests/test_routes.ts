///<reference path='../typings/supertest/supertest.d.ts'/>

/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import supertest = require('supertest');
import app = require('../app');

describe('GET /', function () {
    it('respond with json', function (done) {
        supertest(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
});
