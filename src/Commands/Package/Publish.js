const PackageConfig = require('./Concerns/PackageJsonConfig');
const SubtreesConfig = require('../Git/utils/GitConfig');
const AbstractCommand = require('../../AbstractCommand');

let constructor = function () {

    return {
        package_data: '',
        versions: {},
        execute: async function () {

            let packages = SubtreesConfig.getSubtrees();
            let menu_options = packages.concat([{
                name: "All modules",
                value: "all"
            }
            ]);
            let package_names = [];
            let result = {
                skipped: [],
                done: [],
                error: [],
                not_found: [],
                message: [],
                err_message: []
            };

            AbstractCommand.selectPackageMenu("Publish npm package", menu_options)
                .then(async function (user_choice) {
                    if (!user_choice)
                        process.exit(1);

                    user_choice === 'all' ? packages.forEach(function (subtree) {
                        package_names.push(subtree.name);
                    }) : package_names.push(user_choice);


                    package_names.forEach(function (p) {
                        let cmd = 'cd ' + p + ' && npm publish';
                        let {code, stdout, stderr} = AbstractCommand.callShell(cmd);
                        code === 0 ? result.message.push(stdout)  : code > 0 ? result.err_message.push(stderr) : '';
                        code === 0 ? result.done.push(p) : result.error.push(p);
                    });

                    SubtreesConfig.showResume(result);

                    return true;
                });

        }
    };

};

module.exports = constructor;