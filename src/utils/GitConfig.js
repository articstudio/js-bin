const app = require('../Application');
const AbstractCommand = require('../AbstractCommand');
const PackageUtils = require('./PackageUtils');
const colors = require('colors');

colors.setTheme({
    warn: 'yellow',
    err: 'red'
});

module.exports = {
    getSubtrees: function () {
        let _self = this, package_json = app.getPackage();
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
        let dir = PackageUtils.getPackageDirectory(package_name);
        return AbstractCommand.callShell('find . -type d -wholename "./' + dir + '"').stdout !== '';
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
    },
    showResume: function (result) {

        console.log('RESUME: '.warn);
        console.log('------------------'.warn);

        console.log('Skipped packages: '.warn);
        result.skipped.forEach(function (repo) {
            console.log('    - ' + repo);
        });
        console.log('Done packages: '.warn);
        result.done.forEach(function (repo) {
            console.log('    - ' + repo);
        });
        console.log('Error packages: '.warn);
        result.error.forEach(function (repo) {
            console.log('    - ' + repo);
        });
        console.log('Not found packages: '.warn);
        result.not_found.forEach(function (repo) {
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

        console.log("");
    }
};