'use strict';

let constructor = function (app) {
    return {
        hasChanges: function () {
            return app.utils.shell.call('git diff --exit-code', app.getPath(), true).code !== 0;
        },
        existsSubtree: function (package_name) {
            let directory = app.utils.package.getDirectoryByName(package_name);
            if (app.utils._.indexOf(this.checkSubtrees(), directory) < 0) {
                return false;
            }
            return app.utils.shell.call('find . -type d -wholename "./' + directory + '"', app.getPath(), true).stdout !== '';
        },
        addSubtree: function (package_name, repository, silent = true) {
            if (!silent) {
                app.utils.ui.title('Git subtree add:', package_name);
            }
            let directory = app.utils.package.getDirectoryByName(package_name);
            let response = app.utils.shell.call('git remote add ' + directory + ' ' + repository + ' && git subtree add --prefix=' + directory + '/ ' + repository + ' master', app.getPath(), silent);
            if (response.code !== 0 && !silent) {
                app.utils.ui.error('Error adding the package [' + package_name + '] subtree from [' + repository + '].');
                //app.utils.ui.comment(response.stdout);
                app.utils.ui.lb();
            }
            return response.code === 0;
        },
        pullSubtree: function (package_name, repository, silent = true) {
            if (!silent) {
                app.utils.ui.title('Git subtree pull:', package_name);
            }
            let directory = app.utils.package.getDirectoryByName(package_name);
            let response = app.utils.shell.call('git subtree pull --prefix=' + directory + '/ ' + repository + ' master --squash', app.getPath(), silent);
            if (response.code !== 0 && !silent) {
                app.utils.ui.error('Error pulling the package [' + package_name + '] subtree from [' + repository + '].');
                //app.utils.ui.comment(response.stdout);
                app.utils.ui.lb();
            }
            return response.code === 0;
        },
        pushSubtree: function (package_name, repository, silent = true) {
            if (!silent) {
                app.utils.ui.title('Git subtree push:', package_name);
            }
            let directory = app.utils.package.getDirectoryByName(package_name);
            let response = app.utils.shell.call('git subtree push --prefix=' + directory +  '/ ' + repository + ' master', app.getPath(), silent);
            if (response.code !== 0 && !silent) {
                app.utils.ui.error('Error pushing the package [' + package_name + '] subtree from [' + repository + '].');
                //app.utils.ui.comment(response.stdout);
                app.utils.ui.lb();
            }
            return response.code === 0;
        },
        removeSubtree: function (package_name, repository, silent = true) {
            if (!silent) {
                app.utils.ui.title('Git subtree remove:', package_name);
            }
            let directory = app.utils.package.getDirectoryByName(package_name);
            let response = app.utils.shell.call('git remote rm ' + directory + ' && git rm -r ' + directory + '/ && rm -r ' + directory + '/', app.getPath(), silent);
            if (response.code !== 0 && !silent) {
                app.utils.ui.error('Error removing the package [' + package_name + '] subtree from [' + repository + '].');
                //app.utils.ui.comment(response.stdout);
                app.utils.ui.lb();
            }
            return response.code === 0;
        },
        commit: function (message = 'WIP', files = '-a', silent = true) {
            if (!silent) {
                app.utils.ui.title('Git commit:', message);
            }
            let response = app.utils.shell.call('git commit -m "' + message + '" ' + files, app.getPath(), silent);
            if (response.code !== 0 && !silent) {
                app.utils.ui.error('Error commiting current changes.');
                //app.utils.ui.comment(response.stdout);
                app.utils.ui.lb();
            }
            return response.code === 0;
        },
        commitChanges: function (silent = true) {
            if (!this.hasChanges())
            {
                return app.utils.promised(true);
            }
            return app.utils.ui.ask('Commit message:', 'WIP')
                    .then(message => {
                        return this.commit(message, '-a', silent);
                    });
        },
        checkSubtrees: function () {
            let cmd = "git log"
                    + " | grep git-subtree-dir"
                    + " | tr -d ' '"
                    + " | cut -d \":\" -f2"
                    + " | sort"
                    + " | uniq"
                    + " | xargs -I {} bash -c 'if [ -d $(git rev-parse --show-toplevel)/{} ] ; then echo {}; fi'";
            let r = app.utils.shell.call(cmd, app.getPath(), true);
            return (r.code === 0) ? r.stdout.split("\n") : [];
        }
    };
};

module.exports = constructor;