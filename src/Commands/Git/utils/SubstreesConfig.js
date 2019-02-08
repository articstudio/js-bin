const app = require('../../../Application');

module.exports = {
    getSubtrees: function () {
        let package_json = app.getPackage();
        let config = package_json.hasOwnProperty('data') && package_json.data.hasOwnProperty('config') ? package_json.data.config : [];

        return config.hasOwnProperty('subtree') ? config.subtree : [];
    },
};