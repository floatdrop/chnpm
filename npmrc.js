'use strict';

var path = require('path'),
    url = require('url'),
    pad = require('pad'),
    ini = require('ini'),
    fs = require('fs');

var HOME = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
    NpmRcPath = path.join(HOME, '.npmrc'),
    AllNpmRcs = path.join(HOME, '.*npmrc');

function NpmRc(rcPath) {
    if (!(this instanceof NpmRc)) {
        return new NpmRc(rcPath);
    }

    this.ini = ini.parse(fs.readFileSync(rcPath, 'utf-8'));

    this.path = rcPath;
    Object.defineProperty(this, 'basename', {
        get: function () { return path.basename(this.path); }
    });

    this.name = this.basename.split('.npmrc').shift().substr(1) || 'current';
    this.user = (this.ini.email && this.ini.email.split('@').shift()) || 'anonymous';
    this.ini.registry = this.ini.registry || 'http://registry.npmjs.org/';

    this.uri = this.user + '@' + url.parse(this.ini.registry).host;
}

function resolve(name) {
    return name ?
        path.join(HOME, '.' + name + '.npmrc') :
        path.join(HOME, '.npmrc');
}

NpmRc.prototype.save = function (name, cb) {
    var rs = fs.createReadStream(this.path);
    this.path = resolve(name);
    var ws = fs.createWriteStream(this.path);
    rs.pipe(ws);
    rs.on('end', cb);
};

NpmRc.prototype.toString = function () {
    return pad(11, this.name) + ': ' + this.uri;
};

module.exports = NpmRc;

module.exports.HOME = HOME;
module.exports.NpmRcPath = NpmRcPath;
module.exports.AllNpmRcs = AllNpmRcs;
module.exports.resolve = resolve;
