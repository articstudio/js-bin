const app = require('../../../Application');
const shell = require('shelljs');

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
        return shell.exec('git diff --exit-code', {silent:true}).code !== 0;
    },
    commitChanges: function (message, files) {
        return shell.exec('git commit -m "' + message + '" ' + files, {silent:true}).code;
    },
    subtreeExists: function (package_name) {
        return exec('find . ', ['-type d', '-wholename "./' + package_name + '"'], (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            return stdout !== '';
        });
    }
};