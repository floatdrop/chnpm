'use strict';
var assert = require('assert');
var mock = require('mock-fs');
var passwdUser = require('passwd-user');
var fs = require('fs');
var chnpm = require('./');
var username = require('username');

var homedir = passwdUser.sync(username.sync()).homedir;

afterEach(mock.restore);

it('should return current registry', function () {
	var mockFs = {};
	mockFs[homedir + '/.npmrc'] = 'registry=https://registry.npmjs.org';
	mock(mockFs);
	assert.strictEqual(chnpm.current(), 'https://registry.npmjs.org');
});

it('should save current config as named', function () {
	var mockFs = {};
	mockFs[homedir + '/.npmrc'] = 'registry=https://registry.npmjs.org';
	mock(mockFs);

	chnpm.save('new');

	assert.strictEqual(fs.readFileSync(homedir + '/.new.npmrc', 'utf-8'), 'registry=https://registry.npmjs.org');
});

it('should load config to current', function () {
	var mockFs = {};
	mockFs[homedir + '/.npmrc'] = 'registry=https://registry.npmjs.org';
	mockFs[homedir + '/.new.npmrc'] = 'registry=https://new.npmjs.org';
	mock(mockFs);

	chnpm.load('new');

	assert.strictEqual(fs.readFileSync(homedir + '/.npmrc', 'utf-8'), 'registry=https://new.npmjs.org');
});
