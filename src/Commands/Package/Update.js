const PackageConfig = require('./Concerns/PackageJsonConfig');
const SubtreesConfig = require('../Git/utils/GitConfig');
const AbstractCommand = require('../../AbstractCommand');
const WritePackageJson = require('../../Concerns/WritePackageJson');
const fs = require('fs');

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

            AbstractCommand.selectPackageMenu("Update packages versions", menu_options)
                .then(async function (user_choice) {
                    if (!user_choice)
                        process.exit(1);

                    user_choice === 'all' ? packages.forEach(function (subtree) {
                        package_names.push(subtree.name);
                    }) : package_names.push(user_choice);

                    this.package_data = PackageConfig.getPackageData();
                    this.versions = Object.assign({}, this.package_data.devDependencies, this.package_data.dependencies);

                    package_names.forEach(function (p) {
                        PackageConfig.getPackagesJson(p).map(overrideAllDependenciesVersions);
                    });

                    return true;
                });

        }
    };

    function replaceDependenciesVersions(obj) {
        let package_name, result = {};
        for (package_name in obj) {
            result[package_name] = (package_name in this.versions) ? this.versions[package_name] : obj[package_name];
            let symbol = this.versions[package_name] === obj[package_name] ? '=' : '+';
            symbol === '+' ? console.log('%s %s@%s'.success, symbol, package_name, result[package_name]) :
                console.log('%s %s@%s'.warn, symbol, package_name, result[package_name])
        }
        return result;
    }

    function overrideAllDependenciesVersions(fname) {

        console.log('%s:', fname.warn);
        console.log("");
        this.package_data = JSON.parse(fs.readFileSync(fname));
        console.log('------- devDependencies -------');
        this.package_data.devDependencies = replaceDependenciesVersions(this.package_data.devDependencies);
        console.log("");
        console.log('------- dependencies -------');
        this.package_data.dependencies = replaceDependenciesVersions(this.package_data.dependencies);

        WritePackageJson.Write(this.package_data, fname);
    }

};

module.exports = constructor;