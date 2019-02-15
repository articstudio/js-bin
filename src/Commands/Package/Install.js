const PackageConfig = require('./Concerns/PackageJsonConfig');
const AbstractCommand = require('../../AbstractCommand');
const WritePackageJson = require('../../Concerns/WritePackageJson');
const fs = require('fs');

let constructor = function () {

    return {
        execute: async function () {

            let package_data = PackageConfig.getPackageData();
            let package_dir = PackageConfig.getPackagePath();

            await showNewPackageQuestions().then(answers => {
                let [input_package_name, input_module_name, env] = answers;

                let package_module_file = package_dir + '/' + input_module_name + '/package.json';
                if(!fs.existsSync(package_module_file)) {
                    console.log('Package.json file not found: ' + package_module_file);
                    process.exit(1);
                }

                console.log(package_data);

                let version = searchPackageVersion(input_package_name, package_data);

            });

        }
    };

    async function showNewPackageQuestions(force_store = true) {

        let questions = [
            {
                type: 'input',
                name: 'package',
                message: "Please enter the name of the package to install:"
            },
            {
                type: 'input',
                name: 'module',
                message: "Select a module where you want to install the package"
            },
            {
                type: 'confirm',
                name: 'store',
                message: "Do you want save this package in devDependencies?",
                default: force_store
            },

        ];
        return AbstractCommand.ask(questions)
            .then(answers => {
                return [answers.package, answers.module, answers.store];
            });
    }

    function searchPackageVersion(search_package, package_json) {
        let result = false;
        if (search_package in package_json.dependencies) {
            result = package_json.dependencies[search_package];
        } else if (search_package in package_json.devDependencies) {
            result = package_json.devDependencies[search_package];
        }
        return result;
    }



};

module.exports = constructor;