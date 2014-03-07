'use strict';

var path = require('path'),
    globule = require('globule'),
    ini = require('ini'),
    url = require('url'),
    fs = require('fs'),
    pad = require('pad');

var HOME = process.env.HOME;
var NPMRC = path.join(HOME, '.npmrc');
var currentNpmRc = parseNpmRc(NPMRC);

function save(as) {
    fs.createReadStream(NPMRC)
        .pipe(fs.createWriteStream(find(as)));
}

function find(name) {
    return globule.find(path.join(HOME, '.' + name + '*.npmrc')).pop();
}

function get(name) {
    return parseNpmRc(find(name));
}

function swap(to) {
    fs.createReadStream(find(to))
        .pipe(fs.createWriteStream(NPMRC));
}

function current() {
    return parseNpmRc(NPMRC);
}

function list() {
    return globule.find(path.join(HOME, '.*.npmrc')).map(parseNpmRc);
}

function parseNpmRc(p) {
    var obj = ini.parse(fs.readFileSync(p, 'utf-8'));
    obj.name = path.basename(p).split('.npmrc').shift().substr(1) || 'current';
    obj.user = obj.email && obj.email.split('@').shift();
    obj.uri = [
        obj.user || 'anonymous',
        url.parse(obj.registry || 'http://registry.npmjs.org').host
    ].join('@');
    obj.current = obj.uri === (currentNpmRc || {}).uri;
    obj.toString = function () {
        if (this.current) {
            return pad(11, this.name) + ': ' + this.uri;
        } else {
            return pad(11, this.name) + ': ' + this.uri;
        }
    };
    return obj;
}

module.exports = {
    save: save,
    swap: swap,
    get: get,
    find: find,
    current: current,
    list: list
};
