'use strict';

let constructor = function (app) {

    let verbosity = false;

    let getPackageName = function (package_name) {
        return package_name ? app.utils.promised(package_name) : app.utils.ui.selectPackage(true);
    };

    return app.abstracts.command.extend({
        name: 'git:subtree:pull [package-name]',
        description: 'Git pull subtree',
        options: [
            ['-v, --verbosity', 'Verbosity']
        ],
        action: function (package_name, cmd) {
            verbosity = cmd.verbosity || false;
            let packages = [];
            getPackageName(package_name)
                    .then(result => {
                        packages = (result === 'all') ? app.utils.package.getSubtrees(true) : [[result, app.utils.package.getSubtreeRepository(result)]];

                        return app.utils.git.commitChanges(!verbosity);
                    })
                    .then(result => {
                        if (!result) {
                            if (!verbosity) {
                                app.utils.ui.error('Error pulling the package [' + package_name + '] subtree. Cannot commit current changes!');
                            }
                            this.exit(-1);
                        }

                        let resume = app.utils.ui.getPackagesResume();

                        packages.forEach(data => {
                            let done = app.utils.git.pullSubtree(data[0], data[1], !verbosity);
                            if (!verbosity) {
                                done ? app.utils.ui.success('+ ' + data[0]) : app.utils.ui.error('- ' + data[0]);
                            }
                        });
                    });

        }
    });
};

module.exports = constructor;

