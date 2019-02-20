const AbstractCommand = require('../../AbstractCommand');
const PackageJsonConfig = require('../Package/Concerns/PackageJsonConfig');

let constructor = function () {

    return {
        execute: async function () {

            let cmd = './node_modules/.bin/eslint ' + PackageJsonConfig.getPackagePath();
            //TODO: Falta copiar l'arxiu .eslintrc.json a l'arrel del projecte instal·lat.
            let{code, stdout, stderr} = AbstractCommand.callShell(cmd);
            console.log(stdout);

            return true;
        }
    };
    
};

module.exports = constructor;