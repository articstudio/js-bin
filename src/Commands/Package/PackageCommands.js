let AbstractMenuCommand = require('../../AbstractMenuCommand');
let Install = require('./Install');
let GetDevPackages = require('./GetDevPackages');
let Update = require('./Update');

let constructor = function (config) {
    return AbstractMenuCommand({
        name: 'menu',
        message: 'Package JSON - JS-BIN',
        choices: [
            {
                name: "Install",
                value: "install",
                callback: function () {
                    return new Install().execute();
                }
            },
            {
                name: "Update versions",
                value: "update-versions",
                callback: function () {
                    return new Update().execute();
                }
            },
            {
                name: "Load Packages",
                value: "getDevPackages",
                callback: function () {
                    return new GetDevPackages().execute();
                }
            }
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