'use strict';

var fs = require('fs');
var ini = require('ini');
var passwdUser = require('passwd-user');
var username = require('username');
var cp = require('cp-file');

var homedir = passwdUser.sync(username.sync()).homedir;

module.exports.current = function () {
	var config = ini.parse(fs.readFileSync(homedir + '/.npmrc', 'utf-8'));
	return config.registry;
};

module.exports.save = function (name) {
	if (name === undefined) {
		throw new Error('name argument is required');
	}

	if (typeof name !== 'string') {
		throw new Error('name should be a string');
	}

	cp.sync(homedir + '/.npmrc', homedir + '/.' + name + '.npmrc');
};

module.exports.load = function (name) {
	if (name === undefined) {
		throw new Error('name argument is required');
	}

	if (typeof name !== 'string') {
		throw new Error('name should be a string');
	}

	cp.sync(homedir + '/.' + name + '.npmrc', homedir + '/.npmrc');
};
