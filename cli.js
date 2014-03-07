#!/usr/bin/env node

'use strict';

var chnpm   = require('./'),
    program = require('commander');

require('colors');

program
    .version(require('./package.json').version);

program
    .command('list')
    .description('list available configurations')
    .action(function () {
        var list = chnpm.list();
        for (var i in list) {
            var rc = list[i];
            console.log(rc.toString() + (rc.current ? ' (current) '.green : '  '));
        }
    });

program
    .command('save <name>')
    .description('save current .npmrc as .<name>.npmrc')
    .action(function (name) {
        chnpm.save(name);
    });

program
    .command('* <name>')
    .description('set current .npmrc as .<name>.npmrc')
    .action(function (name) {
        var from = chnpm.current();
        var to = chnpm.get(name);
        if (from.uri !== to.uri) {
            chnpm.swap(name);
            console.log('Switched from ' + from.uri.green + ' to ' + to.uri.green);
        } else {
            console.log('Already on ' + to.uri.green);
        }
    });

program
    .parse(process.argv);
