let app = require('./src/Application');
const Menu = require('./src/Commands/Menu');
const clear = require('clear');
const program = require('commander');
let executed = false;


let prepare = function () {
    clear();
    app.discoverPackage();
    app.setSettings();
    app.registerCommands();
};
let run = function () {
    if (app.noParameters()) {
        Menu();
    }

    program.parse(process.argv);
};

module.exports = {
    exec: function () {
        if (executed) {
            console.log('EXECUTED!');
            return;
        }
        executed = true;
        prepare();
        run();
    }
};