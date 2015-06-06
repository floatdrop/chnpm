'use strict';

var fs = require('fs');
var ini = require('ini');
var pwuid = require('pwuid');

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

	fs.writeFileSync(pwuid().dir + '/.' + name + '.npmrc',
		fs.readFileSync(pwuid().dir + '/.npmrc'));
};

module.exports.load = function (name) {
	if (!name) {
		throw new Error('name argument is required');
	}

	if (typeof name !== 'string') {
		throw new Error('name should be a string');
	}

	fs.writeFileSync(pwuid().dir + '/.npmrc',
		fs.readFileSync(pwuid().dir + '/.' + name + '.npmrc'));
};
