const AbstractCommand = require('../../AbstractCommand');

let constructor = function () {

    return {
        execute: async function () {

            let{code, stdout, stderr} = AbstractCommand.callShell('npm test');

            console.log(stdout);
            return code === 0;
        }
    };

};

module.exports = constructor;