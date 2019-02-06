const package_json = require('./package.json');
const program = require('commander');
const clear = require('clear');
const path = require('path');
const fs = require('fs');
const test_command = require('./src/Commands/test');
const Menu = require('./src/Commands/Menu');

const err_func = function (cmd) {
    console.error("Invalid argument: " + cmd);
};

let singletonApplication = null;

class Application {

    constructor() {
        if(singletonApplication){
            return singletonApplication;
        }

        this.version = package_json.version;
        this.settings = '';
        this.default_command = '';
        this.commands = [
            {name: 'test', alias: 't', description: '', action: test_command}
        ];
        this.package = [];
        this.package_file = '';
        this.package_dir = '';

        singletonApplication = this;
    }


    exec() {
        this.prepare();
        this.run();
    }

    prepare() {
        clear();
        this.discoverPackage();
        this.setSettings();
        this.registerCommands();
    }

    setSettings() {

        //let config = this.package.data ? {} : '';
        //this.settings = config.jsbin ? {} : '';
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

    discoverPackage() {
        this.package_dir =__dirname;
        this.package_file = path.resolve(this.package_dir, 'package.json');
        this.package = [
            {
                directory: this.package_dir,
                file: this.package_file,
                data: JSON.parse(fs.readFileSync(this.package_file, 'utf-8'))
            }
        ];
    }

    static getPackage() {
        return this.package;
    }

    run() {
        if (this.noParameters()) {
            Menu();
        }


        program.parse(process.argv);
    }

}

module.exports = Application;