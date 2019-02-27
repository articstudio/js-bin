'use strict';

let constructor = function (app) {
    return {
        getRealpath: function (path) {
            return app.utils.path.resolve(path || app.getPath(), 'package.json');
        },
        checkExists: function (path) {
            return app.utils.fs.exists(this.getRealpath(path));
        },
        checkExistsByName: function (package_name) {
            return this.checkExists(this.getDirectoryByName(package_name));
        },
        loadData: function (path) {
            return require(this.getRealpath(path));
        },
        writeData: function (data, path) {
            let json = JSON.stringify(data, null, 2) + '\n';
            app.utils.fs.write(this.getRealpath(path), json);
            return this;
        },
        getPackagesJson: function (path) {
            return app.utils.shell.find(path)
                    .filter(function (fname) {
                        return !(fname.indexOf('node_modules') > -1 || fname[0] === '.') && app.utils.path.basename(fname) === 'package.json';
                    });
        },
        getVersionByData: function (package_name, data) {
            if (data.dependencies && package_name in data.dependencies) {
                return data.dependencies[package_name];
            }
            if (data.devDependencies && package_name in data.devDependencies) {
                return data.devDependencies[package_name];
            }
            return false;
        },
        addPackageToData: function (package_name, version, data, save_dev) {
            if (save_dev) {
                if (data.dependencies && package_name in data.dependencies) {
                    delete data.dependencies[package_name];
                }
                data.devDependencies[package_name] = version;
            }
            if (!save_dev) {
                if (data.devDependencies && package_name in data.devDependencies) {
                    delete data.devDependencies[package_name];
                }
                data.dependencies[package_name] = version;
            }
            return data;
        },
        getNameByDirectory: function (dir) {
            let dir_arr = dir.split('/');
            if (dir_arr.length === 1) {
                return dir;
            }
            if (dir_arr.length > 2) {
                dir_arr.splice(0, 2, dir_arr[0] + '/' + dir_arr[1]);
            }
            return dir_arr.join('-');
        },
        getDirectoryByName: function (package_name) {
            let dir_arr = package_name.split('-');
            if (dir_arr.length > 1) {
                dir_arr.splice(0, 2, dir_arr[0] + '/' + dir_arr[1]);
            }
            return dir_arr.join('-');
        },
        getPackageFullname: function (package_name, version) {
            return package_name + (version ? '@' + version : '');
        },
        getAllDependencies: function (data) {
            return app.utils._.assign({}, data.devDependencies, data.dependencies);
        },
        install: function (package_name, version, save_dev, silent = true) {
            let package_str = this.getPackageFullname(package_name, version);
            let save_attr = save_dev ? '--save-dev' : '--save';
            if (!silent) {
                app.utils.ui.title('Package install:', package_str);
            }
            let response = app.utils.shell.call('npm install ' + save_attr + ' ' + package_str, app.getPath(), silent);
            if (response.code !== 0 && !silent) {
                app.utils.ui.error('Error installing the package [' + package_str + '].');
                //app.utils.ui.comment(response.stdout);
                app.utils.ui.lb();
            }
            return response.code === 0;
        },
        publish: function (package_name, silent = true) {
            let directory = this.getDirectoryByName(package_name);
            if (!silent) {
                app.utils.ui.title('Package publish:', package_name);
            }
            let response = app.utils.shell.call('cd ' + directory + ' && npm publish', app.getPath(), silent);
            if (response.code !== 0 && !silent) {
                app.utils.ui.error('Error publishing the package [' + package_name + '].');
                //app.utils.ui.comment(response.stdout);
                app.utils.ui.lb();
            }
            return response.code === 0;
        },
        setSubtrees: function (data, subtrees) {
            data.config.subtree = subtrees;
            return data;
        },
        getSubtrees: function (toPairs) {
            let data = app.getPackage(),
                    subtrees = (data.config && data.config.subtree) ? data.config.subtree : {};
            return toPairs ? app.utils._.toPairs(subtrees) : subtrees;
        },
        getSubtreeRepository: function (package_name) {
            return app.utils._.get(this.getSubtrees(), package_name, false);
        }
    };
};

module.exports = constructor;