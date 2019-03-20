'use strict';

let constructor = function(app) {
    let verbosity = false;

    let getPackageName = function(package_name) {
        return package_name ? app.utils.promised(package_name) : app.utils.ui.selectPackage(true);
    };
    let getSavePackages = function(save) {
        return save !== null
            ? app.utils.promised(save)
            : app.utils.ui.confirm('Remove this packages/repositories to the package.json?', true);
    };
    let writePackageJson = function(save, packages) {
        if (!save) {
            return app.utils.promised(null);
        }
        let subtrees = app.utils.package.getSubtrees();
        packages.forEach(data => {
            delete subtrees[data[0]];
        });
        app.writePackage(app.utils.package.setSubtrees(app.getPackage(), subtrees));
        app.utils.promised(null);
    };

    return app.abstracts.command.extend({
        name: 'git:subtree:remove [package-name]',
        description: 'Git remove subtree',
        options: [
            ['-s, --save <b>', 'Save in package.json', app.utils.parseBool],
            ['-v, --verbosity', 'Verbosity'],
        ],
        action: function(package_name, cmd) {
            verbosity = cmd.verbosity || false;
            let packages = [];
            let save = !!cmd.save === cmd.save ? cmd.save : null;
            getPackageName(package_name)
                .then(result => {
                    packages =
                        result === 'all'
                            ? app.utils.package.getSubtrees(true)
                            : [[result, app.utils.package.getSubtreeRepository(result)]];
                    return getSavePackages(save);
                })
                .then(result => {
                    save = result;
                    return writePackageJson(save, packages);
                })
                .then(() => {
                    return app.utils.git.commitChanges(!verbosity);
                })
                .then(result => {
                    if (!result) {
                        if (!verbosity) {
                            app.utils.ui.error(
                                'Error removing the packages subtrees. Cannot commit current changes!'
                            );
                        }
                        this.exit(-1);
                    }

                    app.utils.ui.lb();
                    app.utils.ui.title('Packages', null, true);

                    packages.forEach(data => {
                        if (!app.utils.git.existsSubtree(data[0])) {
                            return;
                        }
                        let done = app.utils.git.removeSubtree(data[0], data[1], !verbosity);
                        if (!verbosity) {
                            done
                                ? app.utils.ui.success('- ' + data[0])
                                : app.utils.ui.error('! ' + data[0]);
                        }
                        if (done) {
                            app.utils.git.commit(
                                'Removing ' + data[0] + ' package subtree',
                                '',
                                !verbosity
                            );
                        }
                        app.utils.ui.lb();
                    });
                });
        },
    });
};

module.exports = constructor;
