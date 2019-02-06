'use strict';

const inquirer = require('inquirer');

class AbstractMenuCommand {

    constructor(ask) {
        this.question = ask;
    }

    execute() {
        return inquirer
            .prompt(this.question)
            .then(function (answer) {
                if (answer.menu === 'exit') {
                    return -1;
                }
                return answer.menu;
            });
    }
}

module.exports = AbstractMenuCommand;