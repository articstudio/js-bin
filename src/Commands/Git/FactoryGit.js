'use strict';

let Add = require('./Subtree/Add');
let Push = require('./Subtree/Push');
let Pull = require('./Subtree/Pull');
let Remove = require('./Subtree/Remove');
let Check = require('./Subtree/Check');

class FactoryGit {

    createMenu(type) {
        switch (type) {
            case "add":
                return new Add();
            case "push":
                return new Push();
            case "pull":
                return new Pull();
            case "remove":
                return new Remove();
            case "check":
                return new Check();
        }
    }

}

module.exports = FactoryGit;