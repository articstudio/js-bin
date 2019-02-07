let AbstractMenuCommand = require('../../AbstractMenuCommand');

let constructor = function (app, config) {
    return AbstractMenuCommand(app, {
        name: 'menu',
        message: 'JS Utilities - JS-BIN',
        choices: [
            {
                name: "Functionality 1",
                value: "func1",
                callback: function () {
                    //return new Add(app);
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

module.exports = function (app, config) {
    return constructor(app, config)
        .prepare()
        .execute()
        .then(function (callback) {
            return callback ? callback() : -1;
        });
};