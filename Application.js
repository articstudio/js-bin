const package_json = require('./package.json');
const program = require('commander');
const clear = require('clear');
const test_command = require('./src/Commands/test');
const Menu = require('./src/Commands/Menu');

const err_func = function (cmd) {
    console.error("Invalid argument: " + cmd);
};

class Application {

    constructor() {
        this.version = package_json.version;
        this.default_command = '';
        this.commands = [
            {name: 'test', alias: 't', description: '', action: test_command}
        ];
        this.package = [];
        this.package_file = '';
        this.package_dir = '';
    }


    exec() {
        this.prepare();
        this.run();
    }

    prepare() {
        clear();
        this.setSettings();
        this.registerCommands();
    }

    setSettings() {
        program.version(this.version, '-v, --version');
        this.registerCommand({name: '*', alias: '', description: '', action: err_func});
    }

    registerCommand(command) {
        program
            .command(command.name)
            .description(command.description)
            .alias(command.alias)
            .action(function (cmd) {
                command.action(cmd);
            });
    }

    registerCommands() {
        this.commands.forEach(command => this.registerCommand(command));
    }

    noParameters() {
        return process.argv.length <= 2;
    }

    run() {
        if (this.noParameters()) {
            Menu();
        }


        program.parse(process.argv);
    }

}

module.exports = Application;