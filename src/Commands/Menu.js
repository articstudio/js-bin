let AbstractMenuCommand = require('../AbstractMenuCommand');
let FactoryOptions = require('../FactoryOptions');
const inquirer = require('inquirer');

class Menu extends AbstractMenuCommand {

    constructor() {

        const menu_options = [
            {name: "Git", value: "git"},
            {name: "JS", value: "js"},
            {name: "Package json", value: "package"},
            new inquirer.Separator(),
            {name: "Exit", value: "exit"}
        ];

        const questions = [
            {type: 'list', name: 'menu', message: 'Select one to start', choices: menu_options}
        ];
        super(questions);
    }

}


module.exports = function () {
    return new Menu().execute()
        .then(function (option_menu) {
            let factory = new FactoryOptions();
            factory.createMenu(option_menu);
        });
};