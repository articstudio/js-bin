const app = require('../../../Application');
const { exec } = require('child_process');

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
        exec('git diff', ['--exit-code'], (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    },
    commitChanges: function (message, files) {

    }
};