'use strict';

const program = require('commander');
//const program = require('./commander');
const clear = require('clear');

module.exports = function () {
    clear();

    require('./src/application')
            .loadPackage()
            .setConsoleProgram(program)
            .registerLoaders()
            .run();
};