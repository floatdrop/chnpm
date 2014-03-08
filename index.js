'use strict';

var globule = require('globule'),
    EventEmitter2 = require('eventemitter2').EventEmitter2,
    npmrc = require('./npmrc'),
    _ = require('lodash');

require('colors');

module.exports = new EventEmitter2();

module.exports.saveRc = function (name) {
    var rc = npmrc(npmrc.NpmRcPath);
    rc.save(name, function () {
        this.emit('info', 'Saved ' + rc.uri + ' as ' + rc.basename);
    }.bind(this));
};

module.exports.setRc = function (name) {
    var rc = npmrc(npmrc.resolve(name));

    if (!rc) {
        return this.emit('info', 'File ' + npmrc.resolve(name) + ' not found!');
    }

    rc.save(undefined, function () {
        this.emit('info', 'Switched to ' + rc.uri);
    }.bind(this));
};

module.exports.rcs = function () {
    var rcs = this.list();
    return _.zipObject(_.pluck(rcs, 'name'), rcs);
};

module.exports.list = function () {
    return globule.find(npmrc.AllNpmRcs).map(npmrc);
};

module.exports.listRcs = function () {
    var ls = this.rcs();

    var current = ls.current.toString();

    var other = _.reject(_.values(ls), { name: 'current' })
        .map(function (item) { return item.toString(); })
        .join('\n');

    this.emit('info', [
        '',
        current.green,
        '    ------------ available: -------------'.grey,
        other
    ].join('\n'));
};
