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
    },
    commitPreviousChanges: function (package_name, repository_url) {
        if (this.getLocalChanges() && !this.subtreeExists(package_name)) {
            let question = {
                type: 'input',
                name: 'commit',
                message: "You need to commit changes before add a subtree. " + "\n" + "Commit message: \n",
                default: "WIP"
            };
            return AbstractCommand.ask(question)
                .then(answer => {
                    let commited = this.commitChanges(answer.commit, '-a');
                    if (!commited) {
                        console.error('Error adding the package ' + package_name + ' subtree from ' + repository_url +
                            ' because have local changes to commit.');
                        process.exit(1);
                    }
                    return commited;
                });
        }
        return Promise.resolve(true);
    }
};