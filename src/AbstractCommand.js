const inquirer = require('inquirer');
const shell = require('shelljs');
const App = require('./Application');

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

    }
};