'use strict';

let constructor = function (app) {

    let verbosity = false;

    let getPackageName = function (package_name) {
        return package_name ? app.utils.promised(package_name) : app.utils.ui.selectPackage(true);
    };

    return app.abstracts.command.extend({
        name: 'package:publish [package-name]',
        description: 'Package Publish',
        options: [
            ['-v, --verbosity', 'Verbosity']
        ],
        action: function (package_name, cmd) {
            verbosity = cmd.verbosity || false;
            let packages = [];
            getPackageName(package_name)
                    .then(result => {
                        packages = (result === 'all') ? app.utils.package.getSubtrees(true) : [[result, app.utils.package.getSubtreeRepository(result)]];

                        if (!verbosity) {
                            app.utils.ui.title('Packages to publish', null, true);
                        }

                        packages.forEach(package_data => {
                            package_name = package_data[0];
                            if (!app.utils.package.checkExistsByName(package_name)) {
                                return;
                            }

                            let done = app.utils.package.publish(package_name, !verbosity);

                            if (!verbosity) {
                                if (done) {
                                    app.utils.ui.success('The package [' + package_name + '] published succesfully!');
                                } else {
                                    app.utils.ui.error('Error publishing the package [' + package_name + '].');
                                }
                            }
                            app.utils.ui.lb();
                        });

                    });

        }
    });
};

module.exports = constructor;

