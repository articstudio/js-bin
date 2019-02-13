const app = require('../../../Application');
const shell = require('shelljs');
const AbstractCommand = require('../../../AbstractCommand');

module.exports = {
    getSubtrees: function () {
        let package_json = app.getPackage();
        let config = package_json.hasOwnProperty('data') && package_json.data.hasOwnProperty('config') ? package_json.data.config : [];

        if (!config.hasOwnProperty('subtree')) {
            return [];
        }

        return Object.keys(config.subtree).map(key => {
            return {
                name: key,
                url: config.subtree[key]
            }
        });
    },
    getLocalChanges: function () {
        return AbstractCommand.callShell('git diff --exit-code').code !== 0;
    },
    commitChanges: function (message, files) {
        return AbstractCommand.callShell('git commit -m "' + message + '" ' + files).code === 0;
    },
    subtreeExists: function (package_name) {
        return AbstractCommand.callShell('find . -type d -wholename "./' + package_name + '"').stdout !== '' ;
    }
};