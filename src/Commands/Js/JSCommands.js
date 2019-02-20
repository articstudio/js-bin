const AbstractMenuCommand = require('../../AbstractMenuCommand');
const Lint = require('./Lint');
const Test = require('./Test');

let constructor = function (config) {
    return AbstractMenuCommand({
        name: 'menu',
        message: 'JS Utilities - JS-BIN',
        choices: [
            {
                name: "ESLint",
                value: "eslint",
                callback: function () {
                    return new Lint().execute();
                }
            },
            {
                name: "Tests",
                value: "test",
                callback: function () {
                    return new Test().execute();
                }
            },
        ]
    });
};

module.exports = function (config) {
    return constructor(config)
        .prepare()
        .execute()
        .then(function (callback) {
            return callback ? callback() : -1;
        });
};