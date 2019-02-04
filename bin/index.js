#!/usr/bin/env node

const program = require('commander');
const clear = require('clear');

const test_command = require('../src/Commands/test');
const Menu = require('../src/Commands/Menu');


clear();


if(process.argv.length <= 2){
    Menu();
}

program
    .version('1.0.0', '-v, --version')
    .command('*')
    .description('No arguments')
    .action(function (cmd) {
        console.error("Invalid argument: ", cmd);
    });

program
    .command('test')
    .alias('t')
    .description('Test command')
    .action(function () {
        test_command();
    });

program.parse(process.argv);




