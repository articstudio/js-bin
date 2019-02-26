const inquirer = require('inquirer');
const shell = require('shelljs');
const AbstractMenuCommand = require('./AbstractMenuCommand');
const App = require('./Application');
const SubtreesConfig = require('./utils/GitConfig');

module.exports = {
    ask: function (questions) {
        return inquirer
                .prompt(questions)
                .then(answers => {
                    return answers;
                });
    },
    callShell: function (cmd) {
        let package_json = App.getPackage();
        let final_cmd = "cd " + package_json.directory + " && " + cmd;
        let process = shell.exec(final_cmd, {silent: true});

        return {
            code: process.code,
            stdout: process.stdout,
            stderr: process.stderr
        };

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
    }
};