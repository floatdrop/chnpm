/* global describe, it, beforeEach */

'use strict';

var path = require('path'),
    fs = require('fs'),
    ncp = require('ncp').ncp,
    rimraf = require('rimraf'),
    expect = require('chai').expect;

describe('chnpm', function () {

    beforeEach(function (done) {
        delete require.cache[require.resolve('..')];
        process.env.HOME = 'temp';
        if (fs.existsSync('temp')) { rimraf.sync('temp'); }
        ncp(path.join(__dirname, 'fixtures'), 'temp', done);
    });

    it('should list configs', function (done) {
        var chnpm = require('..');
        chnpm.on('info', function (message) {
            expect(message).to.contain('repo: user@repo.domain.com');
            done();
        });
        chnpm.listRcs();
    });

    it('should save configs', function (done) {
        var chnpm = require('..');
        chnpm.on('info', function (message) {
            expect(message).to.contain('Saved user@registry.npmjs.org as .new.npmrc');
            expect(fs.existsSync('temp/.new.npmrc')).to.be.true;
            done();
        });
        chnpm.saveRc('new');
    });

    it('should not overwrite configs', function (done) {
        var chnpm = require('..');
        chnpm.on('error', function (message) {
            expect(message).to.contain('File `temp/.repo.npmrc` already exist!');
            done();
        });
        chnpm.saveRc('repo');
    });

    it('should switch configs', function (done) {
        var chnpm = require('..');
        chnpm.on('info', function (message) {
            expect(message).to.contain('Switched to user@repo.domain.com');
            done();
        });
        chnpm.setRc('repo');
    });

    it('should warn about non-existent configs', function (done) {
        var chnpm = require('..');
        chnpm.on('info', function (message) {
            expect(message).to.contain('File `temp/.unknown.npmrc` not found!');
            done();
        });
        chnpm.setRc('unknown');
    });
});
