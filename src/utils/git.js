'use strict';

const fs = require('fs');

let constructor = function (app) {
    return {
        hasChanges: function() {
            return app.utils.shell.call('git diff --exit-code', app.getPath(), true).code !== 0;
        },
        existsSubtree: function (package_name) {
            let directory = app.utils.package.getDirectoryByName(package_name);
            return app.utils.shell.call('find . -type d -wholename "./' + directory + '"', app.getPath(), true).stdout !== '';
        },
        addSubtree: function (package_name, repository) {
            let directory = app.utils.package.getDirectoryByName(package_name);
            return app.utils.shell.call('git remote add ' + directory + ' ' + repository + ' && git subtree add --prefix=' + directory + '/ ' + repository + ' master', app.getPath(), false).code === 0;
        },
        commit: function(message = 'WIP', files = '-a'){
            return app.utils.shell.call('git commit -m "' + message + '" ' + files, app.getPath(), false).code === 0;
        },
        commitChanges: function() {
            if (!this.hasChanges())
            {
                app.utils.promised(true);
            }
            return app.utils.ui.ask('Commit message:', 'WIP')
                    .then(message => {
                        return this.commit(message);
                    });
        }
    };
};

module.exports = constructor;