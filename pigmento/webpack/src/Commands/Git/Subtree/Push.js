const SubtreesConfig = require('../utils/GitConfig');
const AbstractCommand = require('../../../AbstractCommand');

let constructor = function () {

    return {
        execute: function () {

            let result = {};
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

                    result = pushSubtree(repositories, package_names);
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
            not_found: [],
            message: [],
            err_message: []
        };

        for (let i = 0; i < repositories.length; i++) {
            let repo = repositories[i];
            if (packages_names.length <= 0 || packages_names.indexOf(repo.name) >= 0) {
                if (!SubtreesConfig.subtreeExists(repo.name)) {
                    result.not_found.push(repo.name);
                    repositories.splice(i, 1);
                    i--;
                    continue;
                }
                let dir = SubtreesConfig.getPackageDirectory(repo.name);
                let cmd = 'git subtree push --prefix=' + dir +  '/ ' + repo.url + ' master';
                let {code, stdout, stderr} = AbstractCommand.callShell(cmd);
                code === 0 ? result.message.push(stdout)  : code > 0 ? result.err_message.push(stderr) : '';
                code === 0 ? result.done.push(repo.name) : result.error.push(repo.name);
                continue;

            }
            result.skipped.push(repo.name);

        }

        return result;
    }
};

module.exports = constructor;