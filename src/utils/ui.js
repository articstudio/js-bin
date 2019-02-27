'use strict';

const inquirer = require('inquirer');
const colors = require('colors');

let constructor = function (app) {
    return {
        prompt: function (questions) {
            return inquirer
                    .prompt(questions);
        },
        ask: function (title, answer) {
            return this.prompt({
                type: 'input',
                message: title,
                name: 'answer',
                default: answer || null
            }).then(response => {
                return response.answer;
            });
        },
        confirm: function (title, confirmed = false) {
            return this.prompt({
                type: 'confirm',
                message: title,
                name: 'confirmed',
                default: confirmed
            }).then(response => {
                return response.confirmed;
            });
        },
        menu: function (title, choices, opts) {
            choices = choices || [];
            opts = opts || {};
            if (opts.backOption || opts.exitOption) {
                choices.push(new inquirer.Separator());
            }
            if (opts.backOption) {
                choices.push({name: 'Back', value: 'back'});
            }
            if (opts.exitOption) {
                choices.push({name: 'Exit', value: 'exit'});
            }
            return this.prompt({
                type: 'list',
                message: title,
                name: 'choice',
                choices: choices,
                pageSize: 10
            }).then(response => {
                return response.choice;
            });
        },
        selectPackage: function (use_all_option, extra) {
            let menu_options = Object.keys(app.utils.package.getSubtrees());
            if (use_all_option) {
                menu_options = menu_options.concat([
                    {
                        name: 'All subtrees',
                        value: 'all'
                    }
                ]);
            }
            menu_options = menu_options.concat(extra || []);
            return this.menu('Subtree packages', menu_options);
        },
        warning: function (txt) {
            console.log(colors.yellow(txt));
        },
        error: function (txt) {
            console.log(colors.red(txt));
        },
        success: function (txt) {
            console.log(colors.green(txt));
        },
        title: function (txt, comment, separator) {
            console.log(colors.bold(txt), (comment || ''));
            if (separator) {
                console.log(colors.bold('--------------------'));
                this.lb();
            }
        },
        comment: function (txt) {
            console.log(txt);
        },
        lb: function () {
            this.lineBreak();
        },
        lineBreak: function () {
            console.log('');
        },
        getPackagesResume: function () {
            return {
                skipped: [],
                done: [],
                error: [],
                not_found: [],
                message: [],
                err_message: []
            };
        },
        showPackagesResume: function (result) {

            console.log('RESUME: '.warn);
            console.log('------------------'.warn);

            console.log('Skipped packages: '.warn);
            result.skipped.forEach(repo => {
                console.log('    - ' + repo);
            });
            console.log('Done packages: '.warn);
            result.done.forEach(repo => {
                console.log('    - ' + repo);
            });
            console.log('Error packages: '.warn);
            result.error.forEach(repo => {
                console.log('    - ' + repo);
            });
            console.log('Not found packages: '.warn);
            result.not_found.forEach(repo => {
                console.log('    - ' + repo);
            });

            if ((!result.message || result.message.length === 0) && (!result.err_message || result.err_message.length === 0))
            {
                return;
            }

            console.log('');
            console.log('------------------'.warn);
            console.log('');

            if ((result.message && result.message.length > 0))
            {
                console.log('Message: '.warn);
                result.message.forEach(function (m) {
                    console.log(m);
                });
            }

            if ((result.err_message && result.err_message.length > 0))
            {
                console.log('Error message: '.err);
                result.err_message.forEach(function (m) {
                    console.log(m);
                });
            }

            console.log('');
        }
    };
};

module.exports = constructor;