'use strict';

const shell = require('shelljs');

let constructor = function () {
    return {
        call: function (cmd, cwd, silent = true) {
            let process = shell.exec((cwd ? 'cd ' + cwd + ' && ' : '') + cmd, {silent: silent});
            return {
                code: process.code,
                stdout: process.stdout,
                stderr: process.stderr
            };
        },
        find: function (path) {
            return shell.find(path);
        }
    };
};

module.exports = constructor;