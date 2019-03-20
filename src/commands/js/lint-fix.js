'use strict';

let constructor = function (app) {

    return app.abstracts.command.extend({
        name: 'js:lint:fix',
        description: 'JavaScript Lint fix',
        alias: 'lint:fix',
        action: function () {
            let path = app.getPath();
            let file = app.utils.path.resolve(path, './.eslintrc.json');
            this.exec('./node_modules/.bin/eslint -c ' + file + ' --fix ' + path);
        }
    });
};

module.exports = constructor;

