const SubtreesConfig = require('../utils/GitConfig');
const AbstractCommand = require('../../../AbstractCommand');
const WritePackageJson = require('../../../Concerns/WritePackageJson');
const AbstractMenuCommand = require('../../../AbstractMenuCommand');


let constructor = function () {

    return {
        execute: function () {
            let repositories = SubtreesConfig.getSubtrees();
            let store = null;
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

                    console.log(package_names);
                    result = removeDirAndRemoteSubtree(repositories, package_names);
                    store = await showNewPackageQuestions();

                    if (store) {
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
                message: "Remove this package/repository of the Composer config?",
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

        repositories.forEach(function (repo, index) {
            if (packages_names.length <= 0 || packages_names.indexOf(repo) >= 0) {
                if (!SubtreesConfig.subtreeExists(repo)) {
                    result.not_found.push(repo);
                    repositories.splice(index, 1);
                } else {
                    let cmd = 'git remote rm ' + repo;
                    AbstractCommand.callShell(cmd);
                    cmd = 'git rm -r ' + repo + '/';
                    AbstractCommand.callShell(cmd);
                    cmd = 'rm -r ' + repo + '/';
                    AbstractCommand.callShell(cmd);
                    cmd = 'git commit -m "Removing ' + repo + ' subtree"';
                    let [exit_code, output, error] = AbstractCommand.callShell(cmd);
                    exit_code === 0 ? result.done.push(repo) : result.error.push(repo);
                }
            } else {
                result.skipped.push(repo);
            }
        });

        return result;
    }
};

module.exports = constructor;