const PackageConfig = require('./Concerns/PackageJsonConfig');
const SubtreesConfig = require('../Git/utils/GitConfig');
const AbstractCommand = require('../../AbstractCommand');
const normalizeData = require('normalize-package-data')

let constructor = function () {

    return {
        package_data: '',
        versions: {},
        execute: async function () {

            let packages = SubtreesConfig.getSubtrees();
            let menu_options = packages.concat([{
                name: "Root project",
                value: "root"
            }, {
                name: "All modules",
                value: "all"
            }
            ]);
            let package_names = [];

            AbstractCommand.selectPackageMenu("Update packages versions", menu_options)
                .then(async function (user_choice) {
                    if (!user_choice)
                        process.exit(1);

                    user_choice === 'all' ? packages.forEach(function (subtree) {
                        package_names.push(subtree.name);
                    }) : user_choice === 'root' ? package_names.push(PackageConfig.getPackageFile()) : package_names.push(user_choice);

                    package_names.forEach(function (p) {
                        PackageConfig.getPackagesJson(p).map(normalizePackageFile);
                    });

                    return true;
                });

        }
    };

    function normalizePackageFile(fname) {
        normalizeData(fname);
    }
};

module.exports = constructor;