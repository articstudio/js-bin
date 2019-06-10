'use strict';

let constructor = function(app) {
    let verbosity = false;

    let getPackageName = function(package_name) {
        if (package_name) {
            return app.utils.promised(package_name);
        }
        let groups = Object.keys(app.utils.package.getVersionsGroups()).map(name => {
            return {
                name: 'Group: ' + name,
                value: 'group:' + name,
            };
        });
        return app.utils.ui.selectPackage(true, groups);
    };

    let getVersion = function(version) {
        return version
            ? app.utils.promised(version)
            : app.utils.ui.ask('New version', app.utils.package.getAppVersion());
    };

    let updatePackageVersion = function(package_name, version) {
        if (!verbosity) {
            app.utils.ui.title('Package version update', package_name, true);
        }
        let directory = app.utils.package.getDirectoryByName(package_name),
            data = app.utils.package.loadData(directory);
        data.version = version;
        app.utils.package.writeData(data, directory);
        if (!verbosity) {
            app.utils.ui.success(
                'The package [' + package_name + '] versioned succesfully! (' + version + ')'
            );
        }
    };

    return app.abstracts.command.extend({
        name: 'package:version [package-name] [version]',
        description: 'Package Versioning',
        options: [['-v, --verbosity', 'Verbosity']],
        action: function(package_name, version, cmd) {
            verbosity = cmd.verbosity || false;
            let packages = [];
            getPackageName(package_name)
                .then(result => {
                    if (result === 'all') {
                        packages = app.utils.package.getSubtrees(true);
                    } else if (result.substring(0, 6) === 'group:') {
                        packages = app.utils.package.getVersionsGroupSubtrees(
                            result.substring(6),
                            true
                        );
                    } else {
                        packages = [[result, app.utils.package.getSubtreeRepository(result)]];
                    }
                    return getVersion();
                })
                .then(result => {
                    if (!verbosity) {
                        app.utils.ui.title('Packages to versioning', null, true);
                    }
                    packages.forEach(package_data => {
                        package_name = package_data[0];
                        if (!app.utils.package.checkExistsByName(package_name)) {
                            return;
                        }
                        updatePackageVersion(package_name, result);
                        app.utils.ui.lb();
                    });
                });
        },
    });
};

module.exports = constructor;
