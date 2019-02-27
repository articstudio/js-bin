'use strict';

let constructor = function (app) {

    let verbosity = false;

    let getPackageName = function (package_name) {
        return package_name ? app.utils.promised(package_name) : app.utils.ui.selectPackage(false, [{name: 'New Package', value: 'new'}]);
    };
    let getNewPackageName = function (package_name) {
        return (package_name === 'new') ? app.utils.ui.ask('Please enter the name of the package:') : app.utils.promised(package_name);
    };
    let getPackageRepository = function (repository) {
        return repository ? app.utils.promised(repository) : app.utils.ui.ask('Please enter the URL of the git repository:');
    };
    let getSavePackage = function (save) {
        return (save !== null) ? app.utils.promised(save) : app.utils.ui.confirm('Store this package/repository to the package.json?', true);
    };
    let writePackageJson = function (save, package_name, repository) {
        if (!save) {
            return app.utils.promised(null);
        }
        let subtrees = app.utils.package.getSubtrees();
        subtrees[package_name] = repository;
        app.writePackage(app.utils.package.setSubtrees(app.getPackage(), subtrees));
        app.utils.promised(null);
    };

    return app.abstracts.command.extend({
        name: 'git:subtree:add [package-name] [repository]',
        description: 'Git add subtree',
        options: [
            ['-s, --save <b>', 'Save in package.json', app.utils.parseBool],
            ['-v, --verbosity', 'Verbosity']
        ],
        action: function (package_name, repository, cmd) {
            verbosity = cmd.verbosity || false;
            let save = (!!cmd.save === cmd.save) ? cmd.save : null;
            let use_save = !!repository;
            getPackageName(package_name)
                    .then(result => {
                        use_save = use_save || (result === 'new');
                        return getNewPackageName(result);
                    })
                    .then(result => {
                        if (!result)
                        {
                            this.exit();
                        }
                        package_name = result;
                        if (app.utils.git.existsSubtree(package_name))
                        {
                            app.utils.ui.error('Error adding the package [' + package_name + '] subtree. It already exists!');
                            this.exit(-1);
                        }
                        repository = repository || app.utils.package.getSubtreeRepository(package_name);
                        use_save = use_save || !repository;
                        return getPackageRepository(repository);
                    })
                    .then(result => {
                        if (!result)
                        {
                            app.utils.ui.error('Error adding the package [' + package_name + '] subtree. Repository not found!');
                            this.exit();
                        }
                        repository = result;
                        return getSavePackage(use_save ? save : false);
                    })
                    .then(result => {
                        save = result;
                        return writePackageJson(save, package_name, repository);
                    })
                    .then(result => {
                        return app.utils.git.commitChanges(!verbosity);
                    })
                    .then(result => {
                        if (!result) {
                            if (!verbosity) {
                                app.utils.ui.error('Error adding the package [' + package_name + '] subtree. Cannot commit current changes!');
                            }
                            this.exit(-1);
                        }
                        return app.utils.git.addSubtree(package_name, repository, !verbosity);
                    })
                    .then(result => {
                        if (!result) {
                            if (!verbosity) {
                                app.utils.ui.error('Error adding the package [' + package_name + '] subtree. Cannot add subtree!');
                            }
                            this.exit(-1);
                        }
                        app.utils.ui.success('The package [' + package_name + '] subtree from [' + repository + '] added succesfully!');
                    });

        }
    });
};

module.exports = constructor;

