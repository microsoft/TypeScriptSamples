///<reference path='../typings/supertest/supertest.d.ts'/>

/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />

import supertest = require('supertest');
import app = require('../app');
const request = supertest(app.App);

describe('GET /', function () {
    it('respond with HTML', function (done) {
        request
            .get('/')
            .set('Accept', 'text/html; charset=utf-8')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done);
    })
});

describe('GET /findImages', function () {
    it('respond with HTML', function (done) {
        request
            .get('/findImages')
            .set('Accept', 'text/html; charset=utf-8')
            .query({url: 'http://www.mememaker.net/static/images/memes/4269694.jpg'})
            .expect(200, done);
    })
});
