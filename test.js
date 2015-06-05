'use strict';
var assert = require('assert');
var mock = require('mock-fs');
var pwuid = require('pwuid');
var fs = require('fs');
var chnpm = require('./');

afterEach(mock.restore);

it('should return current registry', function () {
	var mockFs = {};
	mockFs[pwuid().dir + '/.npmrc'] = 'registry=https://registry.npmjs.org';
	mock(mockFs);
	assert.strictEqual(chnpm.current(), 'https://registry.npmjs.org');
});

it('should save current config as named', function () {
	var mockFs = {};
	mockFs[pwuid().dir + '/.npmrc'] = 'registry=https://registry.npmjs.org';
	mock(mockFs);

	chnpm.save('new');

	assert.strictEqual(fs.readFileSync(pwuid().dir + '/.new.npmrc', 'utf-8'), 'registry=https://registry.npmjs.org');
});

it('should load config to current', function () {
	var mockFs = {};
	mockFs[pwuid().dir + '/.npmrc'] = 'registry=https://registry.npmjs.org';
	mockFs[pwuid().dir + '/.new.npmrc'] = 'registry=https://new.npmjs.org';
	mock(mockFs);

	chnpm.load('new');

	assert.strictEqual(fs.readFileSync(pwuid().dir + '/.npmrc', 'utf-8'), 'registry=https://new.npmjs.org');
});
