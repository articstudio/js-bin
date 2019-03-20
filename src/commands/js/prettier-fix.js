'use strict';

let constructor = function (app) {

    return app.abstracts.command.extend({
        name: 'js:prettier:fix',
        description: 'JavaScript Prettier fix',
        alias: 'prettier:fix',
        action: function () {
            let path = app.getPath();
            let file = app.utils.path.resolve(path, './.prettierrc');
            let file_ignore = app.utils.path.resolve(path, './.prettierignore');
            this.exec('./node_modules/.bin/prettier --config '+file+' --ignore-path '+file_ignore+' --write ' + path + '**/**.js');
        }
    });
};

module.exports = constructor;

