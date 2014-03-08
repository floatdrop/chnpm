#!/usr/bin/env node
'use strict';

var chnpm    = require('./'),
    program  = require('commander');

program
    .version(require('./package.json').version);

program
    .option('-v, --verbose', 'Enable verbose output')
    .parse(process.argv);

chnpm.on('info', console.log);

if (program.verbose) {
    chnpm.on('log', console.log);
    chnpm.on('warn', console.warn);
    chnpm.on('error', function (message) {
        console.error(message);
        process.exit(1);
    });
}

program
    .command('list')
    .description('list available configurations')
    .action(chnpm.listRcs.bind(chnpm));

program
    .command('save <name>')
    .description('save current .npmrc as .<name>.npmrc')
    .action(chnpm.saveRc.bind(chnpm));

// program
//     .command('* <name>')
//     .description('set current .npmrc as .<name>.npmrc')
//     .action(chnpm.setRc.bind(chnpm));

program
    .parse(process.argv);
