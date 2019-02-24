const PackageConfig = require('../../utils/PackageJsonConfig');
const SubtreesConfig = require('../../utils/GitConfig');
const AbstractCommand = require('../../AbstractCommand');
const WritePackageJson = require('../../utils/WritePackageJson');
const _ = require('lodash');
const fs = require('fs');

let constructor = function () {

    return {
        package_data: '',
        execute: async function () {

            let packages = SubtreesConfig.getSubtrees();
            let menu_options = packages.concat([{
                name: "All subtrees",
                value: "all"
            }
            ]);
            let package_names = [];

            AbstractCommand.selectPackageMenu("Load packages to project", menu_options)
                .then(async function (user_choice) {
                    if (!user_choice)
                        process.exit(1);

                    user_choice === 'all' ? packages.forEach(function (subtree) {
                        package_names.push(subtree.name);
                    }) : package_names.push(user_choice);

                    this.package_data = PackageConfig.getPackageData();
                    initPackageRequires();

                    package_names.forEach(function (p) {
                        PackageConfig.getPackagesJson(p).map(mergeDependencies);
                        console.log("");
                    });
                    WritePackageJson.Write(this.package_data, PackageConfig.getPackageFile());

                    return true;
                });

        }
    };

    function addDependencies(dependencies, fname) {
        if (!dependencies) {
            return;
        }
        let dependency;
        for (dependency in dependencies) {
            let version = dependencies[dependency];
            if (!this.package_data.devDependencies.hasOwnProperty(dependency) && !this.package_data.dependencies.hasOwnProperty(dependency)) {
                this.package_data.devDependencies[dependency] = version;
                console.log('+ %s@%s'.success, dependency, version);
                continue;
            }

            if ((dependency in this.package_data.devDependencies && this.package_data.devDependencies[dependency] === version)
                || (dependency in this.package_data.dependencies && this.package_data.dependencies[dependency] === version)) {
                console.log('= %s@%s', dependency, version);
                continue;
            }

            if (this.package_data.devDependencies.hasOwnProperty(dependency) && this.package_data.devDependencies[dependency] < version) {
                this.package_data.devDependencies[dependency] = version;
            }

            if (this.package_data.dependencies.hasOwnProperty(dependency) && this.package_data.dependencies[dependency] < version) {
                this.package_data.dependencies[dependency] = version;
            }

            console.log('! %s@%s'.warn, dependency, version);

        }

    }

    function mergeDependencies(fname) {
        console.log('%s:', fname.warn);
        console.log("");

        let data = JSON.parse(fs.readFileSync(fname));
        if (data.dependencies) {
            addDependencies(data.dependencies, fname);
        }
        if (data.devDependencies) {
            addDependencies(data.devDependencies, fname);
        }
    }

    function initPackageRequires() {
        if (!_.has(this.package_data, 'dependencies')) {
            this.package_data['dependencies'] = {};
        }
        if (!_.has(this.package_data, 'devDependencies')) {
            this.package_data['devDependencies'] = {};
        }
    }

};

module.exports = constructor;