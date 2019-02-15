const PackageConfig = require('./Concerns/PackageJsonConfig');
const AbstractCommand = require('../../AbstractCommand');
const WritePackageJson = require('../../Concerns/WritePackageJson');
const fs = require('fs');
const colors = require('colors');

colors.setTheme({
    warn: 'yellow',
    err: 'red',
    success: 'green'
});


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

                let version = searchPackageVersion(input_package_name, package_data);
                version = installDevPackage(version, input_package_name);

                WritePackageJson.addPackageToPackageDependencies({[input_package_name]: version}, package_module_file, env);

                let message_ok = "Package " + input_package_name + " successfully installed";
                console.log(message_ok.success);

                return true;

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
                return [answers.package, answers.module, answers.store ? 'd' : null];
            });
    }

    function searchPackageVersion(search_package, package_json) {
        let result = false;
        if (package_json.hasOwnProperty('dependencies') && search_package in package_json.dependencies) {
            result = package_json.dependencies[search_package];
        } else if (package_json.hasOwnProperty('devDependencies') && search_package in package_json.devDependencies) {
            result = package_json.devDependencies[search_package];
        }
        return result;
    }

    function installDevPackage(version, input_package_name) {
        if (!version) {
            if (AbstractCommand.callShell('npm install --save-dev ' + input_package_name).code !== 0) {
                throw 'Error installing package: ' + input_package_name;
            }
            let package_data = JSON.parse(fs.readFileSync(PackageConfig.getPackageFile()));
            version = searchPackageVersion(input_package_name, package_data);
        }

        if (!version) {
            throw 'Package not found: ' + input_package_name;
        }

        return version;
    }



};

module.exports = constructor;