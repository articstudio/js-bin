const SubtreesConfig = require('../../../utils/GitConfig');
const PackageUtils = require('../../../utils/PackageUtils');
const AbstractCommand = require('../../../AbstractCommand');
const WritePackageJson = require('../../../utils/WritePackageJson');

let constructor = function () {

    return {
        execute: function () {
            let packages = SubtreesConfig.getSubtrees();
            let package_name, repository_url, store;
            AbstractCommand.selectPackageMenu("Subtree packages", false, [
                {
                    name: "New package",
                    value: "new"
                }
            ])
                    .then(async function (user_choice) {
                        if (!user_choice)
                            process.exit(1);

                        package_name = user_choice;

                        if (package_name === 'new') {
                            await showNewPackageQuestions().then(answers => {
                                [package_name, repository_url, store] = answers;
                                if (store) {
                                    WritePackageJson.addSubtreeToPackageJson(package_name, repository_url);
                                }
                            });
                        }
                        
                        repository_url = packages.find(element => {
                            return element.name === package_name;
                        });
                        repository_url = repository_url !== undefined ? repository_url.url : null;
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

        let dir = PackageUtils.getPackageDirectory(package_name);
        let cmd_remote_add = 'git remote add ' + dir + ' ' + repository_url;
        let cmd_add_subtree = 'git subtree add --prefix=' + dir + '/ ' + repository_url + ' master';
        AbstractCommand.callShell(cmd_remote_add);
        let {code, stdout, stderr} = AbstractCommand.callShell(cmd_add_subtree);
        if (code === 1) {
            console.error('Error adding the package ' + package_name + ' subtree from ' + repository_url + '' + "\n" + stderr);
            process.exit(1);
        }
        return stdout !== '' ? stdout : stderr;

    }

};

module.exports = constructor;