'use strict';

let app_data = {
    program: null,
    package: null,
    path: process.cwd(),
    loaders: [
        './commands/git/',
        './commands/js/',
        './commands/package/'
    ],
    menu_options: [],
    menu: null
};

let app = {
    utils: null,
    abstracts: null,
    getPath: function () {
        return app_data.path;
    },
    loadPackage: function () {
        app_data.package = this.utils.package.loadData(app_data.path);
        return this;
    },
    getPackage: function () {
        return app_data.package;
    },
    writePackage: function (data) {
        this.utils.package.writeData(data, app_data.path);
        app_data.package = data;
        return this;
    },
    installPackage: function (package_name, version, silent = true) {
        if (!this.utils.package.install(package_name, version, true, silent)) {
            return false;
        }
        this.loadPackage();
        return true;
    },
    getPackageVersion: function(package_name) {
        return this.utils.package.getVersionByData(package_name, this.getPackage());
    },
    setConsoleProgram: function (instance) {
        app_data.program = instance;
        app_data.program.version(app_data.package.version, '-V, --version');
        return this;
    },
    getConsoleProgram: function () {
        return app_data.program;
    },
    getMenuOptions: function () {
        return app_data.menu_options;
    },
    addMenuOption: function (menu_option) {
        app_data.menu_options.push(menu_option);
        return this;
    },
    getMenu: function () {
        return app_data.menu;
    },
    setMenu: function (menu) {
        app_data.menu = menu;
        return this;
    },
    registerCommand: function (command) {
        let cmd = app_data.program
                .command(command.name)
                .description(command.description);
        if (command.alias) {
            cmd.alias(command.alias);
        }
        command.options.forEach(option => {
            cmd.option(...option);
        });
        cmd.action(function () {
            return command.action(...arguments);
        });
    },
    registerLoader: function (loader) {
        if (typeof (loader) === 'string')
        {
            this.registerLoader(require(loader));
            return;
        }
        if (Array.isArray(loader))
        {
            loader.forEach(subloader => {
                this.registerLoader(subloader);
            });
            return;
        }
        if (typeof (loader) === 'function')
        {
            this.registerLoader(loader(this));
            return;
        }
        if (typeof (loader) !== 'object')
        {
            return;
        }
        app_data.menu_options.push(loader);
    },
    registerLoaders: function () {
        let loaders = (app_data.package.config && app_data.package.config.jsbin) ? app_data.package.config.jsbin : [];
        app_data.loaders
                .concat(loaders)
                .forEach(loader => this.registerLoader(loader));
        return this;
    },
    callCommand: function (argv) {
        if (!argv)
        {
            return -1;
        }
        argv = process.argv.slice(0, 2).concat(Array.isArray(argv) ? argv : [argv]);
        return app_data.program.parse(argv);
    },
    showMenu: function (menu) {
        return (menu || this.getMenu()).run();
    },
    run: function () {
        if (process.argv.length > 2) {
            return this.callCommand(process.argv.splice(2));
        }
        return this
                .setMenu(require('./commands/menu')(app))
                .showMenu();
    }
};

app.utils = require('./utils/')(app);
app.abstracts = require('./abstracts/')(app);

module.exports = app;