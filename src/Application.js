const package_json = require('../package.json');
const program = require('commander');
const path = require('path');
const fs = require('fs');
const test_command = require('./Commands/test');

const err_func = function (cmd) {
    console.error("Invalid argument: " + cmd);
};

module.exports = {
    version: package_json.version,
    settings: '',
    default_command: '',
    commands: [
        {name: 'test', alias: 't', description: '', action: test_command}
    ],
    package: [],
    package_file: '',
    package_dir: '',
    setSettings: function () {
        program.version(this.version, '-v, --version');
        this.registerCommand({name: '*', alias: '', description: '', action: err_func});
    },
    registerCommand: function (command) {
        program
            .command(command.name)
            .description(command.description)
            .alias(command.alias)
            .action(function (cmd) {
                command.action(cmd);
            });
    },
    registerCommands: function () {
        this.commands.forEach(command => this.registerCommand(command));
    },
    noParameters: function () {
        return process.argv.length <= 2;
    },
    discoverPackage: function () {
        this.package_dir = process.cwd();
        this.package_file = path.resolve(this.package_dir, 'package.json');
        this.package = {
            directory: this.package_dir,
            file: this.package_file,
            data: JSON.parse(fs.readFileSync(this.package_file, 'utf-8'))
        };
        this.package.data.config = {};
    },
    getPackage: function () {
        return this.package;
    }
};