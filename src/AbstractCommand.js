const inquirer = require('inquirer');

module.exports = {
    ask: function (message) {
        return inquirer
            .prompt({
                type: 'input',
                name: 'question',
                message: message
            })
            .then(function (answer) {
                return answer.question;
            });
    }
};