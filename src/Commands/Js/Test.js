const AbstractCommand = require('../../AbstractCommand');

let constructor = function () {

    return {
        execute: async function () {

            let{code, stdout, stderr} = AbstractCommand.callShell('npm test');

            code === 0 ? console.log(stdout) : console.log(stderr.err);
            return code === 0;
        }
    };

};

module.exports = constructor;