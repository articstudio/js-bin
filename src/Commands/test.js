const inquirer = require('inquirer');
const colors = require('colors');
const pad = require('pad');

const questions = [
    { type: 'confirm', name: 'test', message: 'Is this a test?', default: true}
];

module.exports = function () {
    inquirer
        .prompt(questions)
        .then(function (answers) {
           console.log(answers);
        });
};