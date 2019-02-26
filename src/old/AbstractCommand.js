'use strict';

const inquirer = require('inquirer');
const shell = require('shelljs');

let constructor = function (app) {
    let command = {
        name: '',
        description: '',
        opts: {},
        alias: null,
        action: function () {},
        //
        app: app,
        extend: function (source) {
            return Object.assign(this, source);
        },
        //
        ask: function (questions) {
            return inquirer
                    .prompt(questions)
                    .then(answers => {
                        return answers;
                    });
        },
        callShell: function (cmd) {
            return shell.exec('cd ' + this.app.getPackage().directory + ' && ' + cmd, {silent: true});
        },
        selectPackageMenu: function (title, use_all_option, extra) {
            let menu_options = SubtreesConfig.getSubtrees();
            if (use_all_option) {
                menu_options = menu_options.concat([
                    {
                        name: "All subtrees",
                        value: "all"
                    }
                ]);
            }
            if (extra) {
                menu_options = menu_options.concat(extra);
            }
            return AbstractMenuCommand({
                name: 'menu',
                message: title,
                choices: menu_options
            })
                    .prepare()
                    .execute();
        },

    };

    return command;
};

module.exports = constructor;