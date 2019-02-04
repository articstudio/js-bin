const inquirer = require('inquirer');
const colors = require('colors');
const pad = require('pad');

const menu_options = [
    {name: "Git", value: "git"},
    {name: "JS", value: "js"},
    {name: "Package json", value:"package"},
    new inquirer.Separator(),
    {name: "Exit", value: "exit"}
];

const questions = [
    {type: 'list', name: 'menu', message: 'Select one to start', choices: menu_options}
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answer) {
            console.log(pad(colors.grey('User has selected: '), 20), answer.menu);
        });
};