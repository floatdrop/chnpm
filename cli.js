#!/usr/bin/env node
'use strict';
var meow = require('meow');
var chnpm = require('./');
var chalk = require('chalk');

var cli = meow({
	help: [
		'Usage',
		'  $ chnpm [options] [name]',
		'',
		'Examples',
		'  $ chnpm',
		'  Currently on ' + chalk.green('http://registry.npmjs.org'),
		'',
		'  $ chnpm --save npmjs',
		'  Config saved to ~/.npmjs.npmrc',
		'',
		'  $ npm config set registry http://registry.local.org',
		'  $ chnpm --save local',
		'  Config saved to ~/.local.npmrc',
		'',
		'  $ chnpm local',
		'  Switched to ' + chalk.green('http://registry.local.org'),
		'',
		'Options',
		'  --save NAME  Save current configuration to ~/.NAME.npmrc'
	].join('\n')
});

if (cli.input[0]) {
	try {
		chnpm.load(cli.input[0]);
		console.log('Switched to ' + chalk.green(chnpm.current()));
		process.exit(0);
	} catch (error) {
		fail(error);
	}
}

if (!Object.keys(cli.flags).length) {
	console.log('Currently on ' + chalk.green(chnpm.current()));
	process.exit(0);
}

if (cli.flags.save) {
	try {
		chnpm.save(cli.flags.save);
		console.log('Config saved to ~/.' + name + '.npmrc');
		process.exit(0);
	} catch (error) {
		fail(error);
	}
}

function fail (error) {
	console.error(chalk.red('Operation failed: ') + error.message);
	console.log(err.stack);
	process.exit(1);
}
