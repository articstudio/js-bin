let AbstractMenuCommand = require('../../AbstractMenuCommand');
let FactoryPackage = require('./FactoryPackage');
const inquirer = require('inquirer');

class PackageCommands extends AbstractMenuCommand{
    constructor() {
        const menu_options = [
            {name: "Functionality 1", value: "fun1"},
            {name: "Functionality 2", value: "fun2"},
            {name: "Functionality 3", value: "fun3"},
            new inquirer.Separator(),
            {name: "Exit", value: "exit"}
        ];

        const questions = [
            {type: 'list', name: 'menu', message: 'Package JSON - JS-BIN', choices: menu_options}
        ];
        super(questions);
    }
}

module.exports = function () {
    return new PackageCommands().execute()
        .then(function (option_menu) {
            let factoryPackage = new FactoryPackage();
            let option = factoryPackage.createMenu(option_menu);
            if(isNaN(option))
                return -1;

            option.execute();
        });
};