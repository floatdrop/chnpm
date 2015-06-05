'use strict';

var fs = require('fs');
var ini = require('ini');
var pwuid = require('pwuid');
var cp = require('cp-file');

module.exports.current = function () {
	var config = ini.parse(fs.readFileSync(pwuid().dir + '/.npmrc', 'utf-8'));
	return config.registry;
};

module.exports.save = function (name) {
	if (!name) {
		throw new Error('name argument is required');
	}

	if (typeof name !== 'string') {
		throw new Error('name should be a string');
	}

	cp.sync(pwuid().dir + '/.npmrc', pwuid().dir + '/.' + name + '.npmrc');
};

module.exports.load = function (name) {
	if (!name) {
		throw new Error('name argument is required');
	}

	if (typeof name !== 'string') {
		throw new Error('name should be a string');
	}

	cp.sync(pwuid().dir + '/.' + name + '.npmrc', pwuid().dir + '/.npmrc');
};
