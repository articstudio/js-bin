'use strict';

let constructor = function (app) {

    return app.abstracts.command.extend({
        name: 'js:test',
        description: 'JavaScript Test',
        alias: 'test',
        action: function () {
            this.exec('node node_modules/.bin/mocha');
        }
    });
};

module.exports = constructor;

