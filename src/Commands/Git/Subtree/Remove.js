const SubtreesConfig = require('../utils/GitConfig');
const AbstractCommand = require('../../../AbstractCommand');
const WritePackageJson = require('../../../Concerns/WritePackageJson');


let constructor = function () {

    return {
        execute: function () {
            let repositories = SubtreesConfig.getSubtrees();
            let force_store = null;
            let result = {};
            let menu_options = repositories.concat([{
                name: "All subtrees",
                value: "all"
            }
            ]);
            let package_names = [];
            AbstractCommand.selectPackageMenu("Remove Subtrees", menu_options)
                .then(async function (user_choice) {
                    if (!user_choice)
                        process.exit(1);

                    user_choice === 'all' ? repositories.forEach(function (subtree) {
                        package_names.push(subtree.name);
                    }) : package_names.push(user_choice);

                    result = removeDirAndRemoteSubtree(repositories, package_names);
                    force_store = await showNewPackageQuestions();

                    if (force_store.store) {
                        WritePackageJson.removeSubtreeToComposer(package_names);
                    }

                    SubtreesConfig.showResume(result);

                    return true;

                });

        }
    };

    async function showNewPackageQuestions(force_store = null) {

        if (force_store === null) {
            let question = {
                type: 'confirm',
                name: 'store',
                message: "Remove this package/repository of the Package.json config?",
                default: force_store
            };
            force_store = await AbstractCommand.ask(question);
        }

        return force_store;
    }

    function removeDirAndRemoteSubtree(repositories = [], packages_names) {

        let result = {
            skipped: [],
            done: [],
            error: [],
            not_found: []
        };

        for (let i = 0; i < repositories.length; i++) {
            let repo = repositories[i];
            if (packages_names.length <= 0 || packages_names.indexOf(repo.name) >= 0) {
                if (!SubtreesConfig.subtreeExists(repo.name)) {
                    result.not_found.push(repo);
                    repositories.splice(i, 1);
                    i--;
                    continue;
                }
                let cmd = 'git remote rm ' + repo.name;
                AbstractCommand.callShell(cmd);
                cmd = 'git rm -r ' + repo.name + '/';
                AbstractCommand.callShell(cmd);
                cmd = 'rm -r ' + repo.name + '/';
                AbstractCommand.callShell(cmd);
                cmd = 'git commit -m "Removing ' + repo.name + ' subtree"';
                let {code, stdout, stderr} = AbstractCommand.callShell(cmd);
                code === 0 ? result.done.push(repo) : result.error.push(repo);
                continue;

            }
            result.skipped.push(repo);

        }

        return result;
    }
};

module.exports = constructor;