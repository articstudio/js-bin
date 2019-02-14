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
    removeSubtreeToComposer: function (itemsToRemove) {
        let package_json = app.getPackage();
        let package_json_file = package_json.file;
        let package_json_data = package_json.data;

        if (!package_json_data.config.hasOwnProperty('subtree')) {
            package_json_data.config.subtree = {};
        }
        let current_subtrees = Object.keys(package_json_data.config.subtree);
        let copy_current_subtrees = current_subtrees.slice();

        current_subtrees.forEach(function (current_subtree, index) {
            if(itemsToRemove.indexOf(current_subtree) >= 0){
                copy_current_subtrees.splice(index, 1);
            }
        });

        package_json_data.config.subtree = copy_current_subtrees;

        //WritePackageJson(package_json_data, package_json_file);
    }
};

function WritePackageJson(config, package_file) {

    let json = JSON.stringify(config, null, 2) + '\n';
    fs.writeFileSync(package_file, json);
}