let AbstractMenuCommand = require('../../AbstractMenuCommand');
let Install = require('./Install');

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
                name: "Functionality 2",
                value: "func2",
                callback: function () {
                    //return new Push(app);
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