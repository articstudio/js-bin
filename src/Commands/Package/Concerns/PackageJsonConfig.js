const app = require('../../../Application');
const AbstractCommand = require('../../../AbstractCommand');
const shell = require('shelljs');
const path = require('path');

module.exports = {
    getPackageData: function () {
        let data = app.getPackage().data;
        return data === null ? {} : data;
    },
    getPackageFile: function () {
        let file = app.getPackage().file;
        return file === null ? {} : file;
    },
    getPackagePath: function () {
        let directory = app.getPackage().directory;
        return directory === null ? {} : directory;
    },
    getPackagesJson: function (dirname) {
        return shell.find(dirname)
            .filter(function (fname) {
                return !(fname.indexOf('node_modules') > -1 || fname[0] === '.') &&
                    path.basename(fname) === 'package.json';
            });
    }
};