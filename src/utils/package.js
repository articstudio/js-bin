'use strict';

const fs = require('fs');

let constructor = function (app) {
    return {
        getRealpath: function (path) {
            return app.utils.path.resolve(path || app.getPath(), 'package.json');
        },
        loadData: function (path) {
            return require(this.getRealpath(path));
        },
        writeData: function (data, path) {
            let json = JSON.stringify(data, null, 2) + '\n';
            fs.writeFileSync(this.getRealpath(path), json);
            return this;
        },
        getPackagesJson: function (path) {
            return app.utils.shell.find(path)
                    .filter(function (fname) {
                        return !(fname.indexOf('node_modules') > -1 || fname[0] === '.') && app.utils.path.basename(fname) === 'package.json';
                    });
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