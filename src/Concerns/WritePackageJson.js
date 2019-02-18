const app = require('../Application');
const fs = require('fs');
const _ = require('lodash');

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
        current_subtrees.forEach(function (item) {
            itemsToRemove.indexOf(item) >= 0 ? delete package_json_data.config.subtree[item] : null;
        });

        WritePackageJson(package_json_data, package_json_file);
    },
    addPackageToDependencies: function (itemToAdd, package_file, env) {

        let input_package_name = Object.keys(itemToAdd)[0];
        let package_json = JSON.parse(fs.readFileSync(package_file));
        env = (env && (env === 'd' || env === 'D')) ? 'devDependencies' : 'dependencies';
        let packages = _.assign(package_json[env], itemToAdd);
        package_json[env] = packages;

        env = (env !== 'devDependencies') ? 'devDependencies' : 'dependencies';


        if(_.has(package_json, env) && _.has(package_json[env], input_package_name)) {
            delete package_json[env][input_package_name];
        }
        WritePackageJson(package_json, package_file);
    },
    Write: function(config, package_file) {
        WritePackageJson(config, package_file);
    }
};

function WritePackageJson(config, package_file) {

    let json = JSON.stringify(config, null, 2) + '\n';
    fs.writeFileSync(package_file, json);
}