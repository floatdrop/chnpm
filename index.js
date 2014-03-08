'use strict';

var globule = require('globule'),
    EventEmitter2 = require('eventemitter2').EventEmitter2,
    npmrc = require('./npmrc'),
    _ = require('lodash');

require('colors');

module.exports = new EventEmitter2();

module.exports.saveRc = function (name) {
    if (!_.isEmpty(npmrc(npmrc.resolve(name)))) {
        return this.emit('error', 'File `' + npmrc.resolve(name) + '` already exist!');
    }

    var rc = npmrc(npmrc.NpmRcPath);
    rc.save(name, function () {
        this.emit('info', 'Saved ' + rc.uri + ' as ' + rc.basename);
    }.bind(this));
};

module.exports.setRc = function (name) {
    var rc = npmrc(npmrc.resolve(name));

    if (_.isEmpty(rc)) {
        return this.emit('info', 'File `' + npmrc.resolve(name) + '` not found!');
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

    var other = _.reject(_.values(ls), { name: 'current' })
        .map(function (item) {
            var s = item.toString();
            if (item.uri === ls.current.uri) { s += ' (current)'.green; }
            return s;
        })
        .join('\n');

    other = other || 'You are on `' + ls.current.uri.green + '`. Run `chnpm save <name>` to save it into list.';

    this.emit('info', other);
};
