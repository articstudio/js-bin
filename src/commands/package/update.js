'use strict';

let constructor = function(app) {
    let getPackageName = function(package_name) {
        return package_name ? app.utils.promised(package_name) : app.utils.ui.selectPackage(true);
    };
    let replaceDependenciesVersions = function(source, target) {
        let i;
        for (i in target) {
            if (!(i in source)) {
                app.utils.ui.error('! ' + i, target[i]);
                continue;
            }
            if (source[i] === target[i]) {
                app.utils.ui.success('= ' + i, source[i]);
                continue;
            }
            app.utils.ui.warning('+ ' + i, target[i] + ' => ' + source[i]);
            target[i] = source[i];
        }
        return target;
    };
    let overrideAllDependenciesVersions = function(package_name, source) {
        app.utils.ui.title('Package update', package_name, true);

        let directory = app.utils.package.getDirectoryByName(package_name);
        let data = app.utils.package.loadData(directory);

        app.utils.ui.subtitle('Dependencies');
        data.dependencies = replaceDependenciesVersions(source, data.dependencies || {});
        app.utils.ui.lb();

        app.utils.ui.subtitle('DevDependencies');
        data.devDependencies = replaceDependenciesVersions(source, data.devDependencies || {});
        app.utils.ui.lb();

        app.utils.package.writeData(data, directory);
    };

    return app.abstracts.command.extend({
        name: 'package:update [package-name]',
        description: 'Package Update',
        action: function(package_name) {
            let packages = [];
            let versions = app.utils.package.getAllDependencies(app.getPackage());
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
                    overrideAllDependenciesVersions(package_name, versions);
                });
            });
        },
    });
};

module.exports = constructor;
