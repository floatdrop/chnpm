#!/usr/bin/env node

'use strict';

var chnpm    = require('./'),
    program  = require('commander'),
    inquirer = require('inquirer');

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
        var rc = chnpm.find(name);
        if (!rc) { return chnpm.save(name); }

        inquirer.prompt({
            type: 'confirm',
            name: 'overwrite',
            message: name.yellow + ' exists, do you whant to overwrite it?',
            default: false
        }, function (answers) {
            if (answers.overwrite) {
                chnpm.save(name);
            }
        });
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
