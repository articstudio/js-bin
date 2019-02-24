const AbstractCommand = require('../../../AbstractCommand');
const SubtreesConfig = require('../../../utils/GitConfig');
const PackageUtils = require('../../../utils/PackageUtils');
const colors = require('colors');
const _ = require('lodash');

colors.setTheme({
    warn: 'yellow'
});


let constructor = function () {

    return {
        execute: function () {
            console.log('Diff subtrees: '.warn);
            console.log('------------------'.warn);

            console.log('Package.json + subtree'.warn);

            let cmd_subtrees_git = "git log"
                + " | grep git-subtree-dir"
                + " | tr -d ' '"
                + " | cut -d \":\" -f2"
                + " | sort"
                + " | uniq"
                + " | xargs -I {} bash -c 'if [ -d $(git rev-parse --show-toplevel)/{} ] ; then echo {}; fi'";

            let subtrees_package = [];
            SubtreesConfig.getSubtrees().forEach(function (subtree) {
                subtrees_package.push(subtree.name);
            });
            let {code, stdout, stderr} = AbstractCommand.callShell(cmd_subtrees_git);

            let subtrees_git = stdout.split('\n').filter(value => {
                return value !== '';
            });
            subtrees_git.forEach(function(item, index){
                subtrees_git[index] = PackageUtils.getPackageFromDirectory(item);
            });

            let package_and_subtree = _.intersection(subtrees_package, subtrees_git);
            writeSubtreeInfo(package_and_subtree);

            console.log("");
            console.log('Only Package.json'.warn);
            writeSubtreeInfo(_.difference(subtrees_package, subtrees_git));

            console.log("");
            console.log("Only subtrees: ".warn);
            writeSubtreeInfo(_.difference(subtrees_git, package_and_subtree));

            return true;
        }
    };

    function writeSubtreeInfo(subtree = []) {
        subtree.forEach(function (name) {
            console.log(name);
        });
    }
};

module.exports = constructor;