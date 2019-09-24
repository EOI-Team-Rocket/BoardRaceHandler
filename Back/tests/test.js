"use strict"

var assert = require('assert');
var request = require('supertest')
var app = require('../server')

var request = request("http://localhost:8080")

describe('products', function () {
    describe('GET', function () {
        it('Should return json as default data format', function () {
            request.get('/api/products')
                .expect('Content-Type', /json/)
                .expect(400)

        });
    });
});