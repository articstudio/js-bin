let AbstractMenuCommand = require('../../AbstractMenuCommand');
let FactoryJS = require('./FactoryJS');
const inquirer = require('inquirer');

class JSCommands extends AbstractMenuCommand{
    constructor() {
        const menu_options = [
            {name: "Functionality 1", value: "fun1"},
            {name: "Functionality 2", value: "fun2"},
            {name: "Functionality 3", value: "fun3"},
            new inquirer.Separator(),
            {name: "Exit", value: "exit"}
        ];

        const questions = [
            {type: 'list', name: 'menu', message: 'JS Utilities - JS-BIN', choices: menu_options}
        ];
        super(questions);
    }
}

module.exports = function () {
    return new JSCommands().execute()
        .then(function (option_menu) {
            let factoryJS = new FactoryJS();
            let option = factoryJS.createMenu(option_menu);
            if(isNaN(option))
                return -1;

            option.execute();
        });
};