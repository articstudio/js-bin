'use strict';

let constructor = function (app) {

    let verbosity = false;

    let getPackageName = function (package_name) {
        return package_name ? app.utils.promised(package_name) : app.utils.ui.selectPackage(false);
    };
    let getNewPackageName = function (package_name) {
        return (!package_name) ? app.utils.ui.ask('Please enter the name of the package (<package-name>[:<version>]):') : app.utils.promised(package_name);
    };
    let getSaveDevPackage = function (save) {
        return (save !== null) ? app.utils.promised(save) : app.utils.ui.confirm('Save this package in devDependencies?', true);
    };
    let getPackageVersion = function (package_name, version) {
        if (version) {
            return app.utils.promised(version);
        }
        return app.utils.promised(app.getPackageVersion(package_name));
    };
    let installPackage = function (package_name, version) {
        return app.utils.promised(app.installPackage(package_name, version, !verbosity));
    };
    let writePackageJson = function (package_name, version, save_dev, target_package_name) {
        let directory = app.utils.package.getDirectoryByName(target_package_name);
        let data = app.utils.package.loadData(directory);
        data = app.utils.package.addPackageToData(package_name, version, data, save_dev);
        app.utils.package.writeData(data, directory);
        return app.utils.promised(null);
    };

    return app.abstracts.command.extend({
        name: 'package:install [package-name] [target]',
        description: 'Package Install',
        options: [
            ['-d, --save-dev', 'Save in devDependencies'],
            ['-s, --save', 'Save in dependencies'],
            ['-v, --verbosity', 'Verbosity']
        ],
        action: function (package_name, target_package_name, cmd) {
            verbosity = cmd.verbosity || false;
            let save_dev = (!!cmd.saveDev === cmd.saveDev) ? true : ((!!cmd.save === cmd.save) ? false : null);
            let version = null;
            getNewPackageName(package_name)
                    .then(result => {
                        if (!result)
                        {
                            this.exit();
                        }
                        [package_name, version] = result.split('@');
                        version = version || null;
                        return getPackageName(target_package_name);
                    })
                    .then(result => {
                        if (!result)
                        {
                            this.exit();
                        }
                        target_package_name = result;
                        if (!app.utils.package.checkExistsByName(target_package_name))
                        {
                            app.utils.ui.error('Error install the package [' + package_name + '] to [' + target_package_name + ']. Target package.json not exists!');
                            this.exit(-1);
                        }
                        return getSaveDevPackage(save_dev);
                    })
                    .then(result => {
                        save_dev = !!result;
                        return getPackageVersion(package_name, version);
                    })
                    .then(result => {
                        version = result;
                        return installPackage(package_name, version);
                    })
                    .then(result => {
                        if (!result)
                        {
                            if (!verbosity) {
                                app.utils.ui.error('Error installing the package [' + app.utils.package.getPackageFullname(package_name, version) + '].');
                            }
                            this.exit(-1);
                        }
                        version = result;
                        return writePackageJson(package_name, version, save_dev, target_package_name);
                    })
                    .then(result => {
                        if (!result) {
                            if (!verbosity) {
                                app.utils.ui.error('Error installing the package [' + app.utils.package.getPackageFullname(package_name, version) + '] to [' + target_package_name + '].');
                            }
                            this.exit(-1);
                        }
                        app.utils.ui.success('The package [' + app.utils.package.getPackageFullname(package_name, version) + '] installed to [' + target_package_name + '] succesfully!');
                    });

        }
    });
};

module.exports = constructor;

