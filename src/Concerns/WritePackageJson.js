const app = require('../Application');
const fs = require('fs');

module.exports = {
    addSubtreeToPackageJson: function (itemToAdd) {
        let package_json = app.getPackage();
        let package_json_file = package_json.file;
        let package_json_data = package_json.data;

        if (!package_json_data.config.hasOwnProperty('subtree')) {
            package_json_data.config.subtree = {};
        }
        let subtrees = {...package_json_data.config.subtree, ...itemToAdd};
        package_json_data.config.subtree = subtrees;

        WritePackageJson(package_json_data, package_json_file);
    },
};

function WritePackageJson(config, package_file) {

    let json = JSON.stringify(config, null, 2) + '\n';
    fs.writeFileSync(package_file, json);
}