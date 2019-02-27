'use strict';

let constructor = function (app) {

    return app.abstracts.command.extend({
        name: 'git:subtree:check',
        description: 'Git check subtrees health',
        action: function () {

            let existing = app.utils.git.checkSubtrees().map(app.utils.package.getNameByDirectory);
            let saveds = Object.keys(app.utils.package.getSubtrees());
            let founds = app.utils._.intersection(saveds, existing);

            app.utils.ui.title('Packages diff', null, true);

            app.utils.ui.title('Package.json + Git subtree');
            founds.forEach(package_name => {
                app.utils.ui.success('> ' + package_name);
            });
            app.utils.ui.lb();

            app.utils.ui.title('Package.json');
            app.utils._.difference(saveds, founds).forEach(package_name => {
                app.utils.ui.warning('> ' + package_name);
            });
            app.utils.ui.lb();

            app.utils.ui.title('Git subtree');
            app.utils._.difference(existing, existing).forEach(package_name => {
                app.utils.ui.error('> ' + package_name);
            });
            app.utils.ui.lb();

        }
    });
};

module.exports = constructor;

