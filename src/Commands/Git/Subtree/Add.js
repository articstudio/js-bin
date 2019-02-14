let SubtreesConfig = require('../utils/GitConfig');
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
                .then(async function (user_choice) {
                    if (!user_choice)
                        process.exit(1);

                    package_name = user_choice;
                    repository_url = packages.find(element => {
                        return element.name === package_name;
                    });
                    repository_url = repository_url !== undefined ? repository_url.url : null;

                    if (user_choice === 'new') {
                        await showNewPackageQuestions().then(answers => {
                            [package_name, repository_url, store] = answers;
                            if (store) {
                                WritePackageJson.addSubtreeToPackageJson({[package_name]: repository_url});
                            }
                        });
                    }
                    await addGitSubtree(package_name, repository_url).then(message => {
                        console.log(message);
                    });
                });

        }
    };


    async function showNewPackageQuestions(force_store = true) {

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

    async function addGitSubtree(package_name, repository_url) {

        await SubtreesConfig.commitPreviousChanges(package_name, repository_url);

        if (SubtreesConfig.subtreeExists(package_name)) {
            console.error('Error adding the package ' + package_name + ' subtree from ' + repository_url
                + '. It already exists');
            process.exit(1);
        }

        let cmd_remote_add = 'git remote add ' + package_name + ' ' + repository_url;
        let cmd_add_subtree = 'git subtree add --prefix=' + package_name + '/ ' + repository_url + ' master';
        AbstractCommand.callShell(cmd_remote_add);
        let {code, stdout, stderr} = AbstractCommand.callShell(cmd_add_subtree);
        if (code === 1) {
            console.error('Error adding the package ' + package_name + ' subtree from ' + repository_url + '');
            process.exit(1);
        }
        return stdout !== '' ? stdout : stderr;

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