const SubtreesConfig = require('../utils/GitConfig');
const AbstractCommand = require('../../../AbstractCommand');

let constructor = function () {

    return {
        execute: function () {

            let repositories = SubtreesConfig.getSubtrees();
            let menu_options = repositories.concat([{
                name: "All subtrees",
                value: "all"
            }
            ]);
            let package_names = [];
            AbstractCommand.selectPackageMenu("Push subtrees", menu_options)
                .then(async function (user_choice) {
                    if (!user_choice)
                        process.exit(1);

                    user_choice === 'all' ? repositories.forEach(function (subtree) {
                        package_names.push(subtree.name);
                    }) : package_names.push(user_choice);

                    let result = pushSubtree(repositories, package_names) ?? {};
                    SubtreesConfig.showResume(result);

                    return true;

                });
        }
    };


    function pushSubtree(repositories = [], packages_names) {

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
                let cmd = 'git subtree push --prefix=' + repo.name +  '/ ' + repo.url + ' master';
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