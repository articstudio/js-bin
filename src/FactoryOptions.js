'use strict';

const GitCommands = require('./Commands/Git/GitCommands');
const JSCommands = require('./Commands/Js/JSCommands');
const PackageCommands = require('./Commands/Package/PackageCommands');


class FactoryOptions {

    createMenu(type) {
        switch (type) {
            case "git":
                return new GitCommands();
            case "js":
                return new JSCommands();
            case "package":
                return new PackageCommands();
        }
    }

}

module.exports = FactoryOptions;