let SubtreesConfig = require('../utils/SubstreesConfig');
let AbstractCommand = require('../../../AbstractCommand');
let WritePackageJson = require('../../../Concerns/WritePackageJson');
let AbstractMenuCommand = require('../../../AbstractMenuCommand');

let constructor = function () {

    return {
        execute: function () {
            let packages = SubtreesConfig.getSubtrees();
            let menu_options = packages.concat([{
                name: "New package",
                value: "new"
            }
            ]);
            let package_name, repository_url, store;
            selectPackageMenu("Subtree packages", menu_options)
                .then(function (user_choice) {

                    package_name = user_choice;
                    repository_url = packages.find(element => {
                        return element.name === package_name;
                    });
                    repository_url = repository_url !== undefined ? repository_url.url : null;

                    if (user_choice === 'new') {
                        showNewPackageQuestions().then(answers => {
                            [package_name, repository_url, store] = answers;
                            if(store) {
                                WritePackageJson.addSubtreeToPackageJson({[package_name]: repository_url});
                            }
                        });
                    }
                    addGitSubtree(package_name, repository_url);


                });

        }
    };


    function showNewPackageQuestions(force_store = true) {

        let questions = [
            {
                type: 'input',
                name: 'package',
                message: "Please enter the name of the package:"
            },
            {
                type: 'input',
                name: 'url',
                message: "Please enter the URL of the git repository:"
            },
            {
                type: 'confirm',
                name: 'store',
                message: "Store this package/repository to the Composer config?",
                default: force_store
            },

        ];
        return AbstractCommand.ask(questions)
            .then(answers => {
                return [answers.package, answers.url, answers.store];
            });
    }

    function addGitSubtree(package_name, repository_url) {
        SubtreesConfig.getLocalChanges();
    }

    function selectPackageMenu(title, menu_options) {
        return AbstractMenuCommand({
            name: 'menu',
            message: title,
            choices: menu_options
        })
            .prepare()
            .execute()
    }
};

module.exports = constructor;