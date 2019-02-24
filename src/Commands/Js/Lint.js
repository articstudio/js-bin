const AbstractCommand = require('../../AbstractCommand');
const PackageJsonConfig = require('../../utils/PackageJsonConfig');
const fs = require('fs');

let constructor = function () {

    return {
        execute: async function () {

            let config_file = fs.existsSync('./node_modules/js-bin/.eslintrc.json') ? './node_modules/js-bin/.eslintrc.json' : './.eslintrc.json';
            let cmd = './node_modules/.bin/eslint -c ' + config_file + ' ' + PackageJsonConfig.getPackagePath();
            let {code, stdout, stderr} = AbstractCommand.callShell(cmd);

            code === 0 ? console.log('All done.') : code === 1 ? console.log(stdout) : console.log(stderr.err);

            return true;
        }
    };

};

module.exports = constructor;