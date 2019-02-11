let AbstractMenuCommand = require('../../AbstractMenuCommand');
let Add = require('./Subtree/Add');
let Push = require('./Subtree/Push');
let Pull = require('./Subtree/Pull');
let Remove = require('./Subtree/Remove');
let Check = require('./Subtree/Check');

let constructor = function (config) {

    return AbstractMenuCommand({
        name: 'menu',
        message: 'Git Subtrees - JS-BIN',
        choices: [
            {
                name: "Add",
                value: "add",
                callback: function () {
                    return new Add();
                }
            },
            {
                name: "Push",
                value: "push",
                callback: function () {
                    return new Push();
                }
            },
            {
                name: "Pull",
                value: "pull",
                callback: function () {
                    return new Pull();
                }
            },
            {
                name: "Remove",
                value: "remove",
                callback: function () {
                    return new Remove();
                }
            },
            {
                name: "Check",
                value: "check",
                callback: function () {
                    return new Check();
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