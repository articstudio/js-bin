'use strict';

let constructor = function (app) {

    return app.abstracts.command.extend({
        name: 'package:sub:update',
        description: 'Subpackage Update',
        action: function () {
            this.exec('npm test');
        }
    });
};

module.exports = constructor;

