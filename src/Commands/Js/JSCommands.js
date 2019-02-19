const AbstractMenuCommand = require('../../AbstractMenuCommand');
const Lint = require('./Lint');
const Metrics = require('./Metrics');

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
                name: "JS Metrics",
                value: "metrics",
                callback: function () {
                    return new Metrics().execute();
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