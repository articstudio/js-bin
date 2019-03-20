'use strict';

let constructor = function(app) {
    let getPackageName = function(package_name) {
        return package_name ? app.utils.promised(package_name) : app.utils.ui.selectPackage(true);
    };
    let replaceDependenciesVersions = function(source, target, dev_target) {
        let i, version;
        for (i in source) {
            version = source[i];

            if (!(i in target) && !(i in dev_target)) {
                app.utils.ui.warning('+ ' + i, version);
                dev_target[i] = version;
                continue;
            }

            if (
                (i in target && target[i] === version) ||
                (i in dev_target && dev_target[i] === version)
            ) {
                app.utils.ui.success('= ' + i, version);
                continue;
            }

            if (i in target) {
                if (target[i] < version) {
                    app.utils.ui.warning('+ ' + i, target[i] + ' => ' + version);
                    target[i] = version;
                } else {
                    app.utils.ui.error('! ' + i, target[i] + ' <=> ' + version);
                }
                continue;
            }

            if (i in dev_target) {
                if (dev_target[i] < version) {
                    app.utils.ui.warning('+ ' + i, dev_target[i] + ' => ' + version);
                    dev_target[i] = version;
                } else {
                    app.utils.ui.error('! ' + i, dev_target[i] + ' <=> ' + version);
                }
                continue;
            }
        }
        return [target, dev_target];
    };
    let loadAllDependenciesVersions = function(package_name, target, dev_target) {
        app.utils.ui.title('Package load', package_name, true);

        let directory = app.utils.package.getDirectoryByName(package_name);
        let data = app.utils.package.loadData(directory);
        let versions = app.utils.package.getAllDependencies(data);

        [target, dev_target] = replaceDependenciesVersions(versions, target, dev_target);
        app.utils.ui.lb();

        return [target, dev_target];
    };

    return app.abstracts.command.extend({
        name: 'package:load [package-name]',
        description: 'Package Load',
        action: function(package_name) {
            let packages = [];
            let data = app.getPackage();
            let dependencies = data.dependencies || {};
            let dev_dependencies = data.devDependencies || {};
            getPackageName(package_name).then(result => {
                packages =
                    result === 'all'
                        ? app.utils.package.getSubtrees(true)
                        : [[result, app.utils.package.getSubtreeRepository(result)]];

                packages.forEach(package_data => {
                    package_name = package_data[0];
                    if (!app.utils.package.checkExistsByName(package_name)) {
                        return;
                    }

                    [dependencies, dev_dependencies] = loadAllDependenciesVersions(
                        package_name,
                        dependencies,
                        dev_dependencies
                    );
                });

                data.dependencies = dependencies;
                data.devDependencies = dev_dependencies;

                app.writePackage(data);
            });
        },
    });
};

module.exports = constructor;
