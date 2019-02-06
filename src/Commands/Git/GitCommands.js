let AbstractMenuCommand = require('../../AbstractMenuCommand');
let FactoryGit = require('./FactoryGit');
const inquirer = require('inquirer');

class GitCommands extends AbstractMenuCommand{
    constructor() {
        const menu_options = [
            {name: "Add", value: "add"},
            {name: "Push", value: "push"},
            {name: "Pull", value: "pull"},
            {name: "Remove", value: "remove"},
            {name: "Check", value: "check"},
            new inquirer.Separator(),
            {name: "Exit", value: "exit"}
        ];

        const questions = [
            {type: 'list', name: 'menu', message: 'Git Subtrees - JS-BIN', choices: menu_options}
        ];
        super(questions);
    }
}

module.exports = function () {
    return new GitCommands().execute()
        .then(function (option_menu) {
            let factoryGit = new FactoryGit();
            let option = factoryGit.createMenu(option_menu);
            if(isNaN(option))
                return -1;

            option.execute();
        });
};