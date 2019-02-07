let AbstractMenuCommand = require('../AbstractMenuCommand');
const GitCommands = require('./Git/GitCommands');
const JSCommands = require('./Js/JSCommands');
const PackageCommands = require('./Package/PackageCommands');

let constructor = function (config) {

    return AbstractMenuCommand({
        name: 'menu',
        message: 'Select one to start',
        choices: [
            {
                name: "Git",
                value: "git",
                callback: function () {
                    return new GitCommands();
                }
            },
            {
                name: "JS",
                value: "js",
                callback: function () {
                    return new JSCommands();
                }
            },
            {
                name: "Package json",
                value: "package",
                callback: function () {
                    return new PackageCommands();
                }
            }
        ]
    });

    function addCommand() {
        return "A";
    }
};


module.exports = function (config) {

    let command = {name: 'git', alias: 't', description: '', action: this};
    return constructor(config)
        .prepare()
        .execute()
        .then(function (callback) {
            return callback ? callback() : -1;
        });
};