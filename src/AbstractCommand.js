const inquirer = require('inquirer');

module.exports = {
    ask: function (questions) {
        return inquirer
            .prompt(questions)
            .then(answers => {
                return answers;
            });
    }
};