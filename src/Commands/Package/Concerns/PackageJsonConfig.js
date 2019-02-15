const app = require('../../../Application');
const AbstractCommand = require('../../../AbstractCommand');

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
    }
};