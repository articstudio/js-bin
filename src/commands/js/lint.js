'use strict';

let constructor = function(app) {
    return app.abstracts.command.extend({
        name: 'js:lint',
        description: 'JavaScript Lint',
        alias: 'lint',
        action: function() {
            let path = app.getPath();
            let file = app.utils.path.resolve(path, './.eslintrc.json');
            this.exec('./node_modules/.bin/eslint -c ' + file + ' ' + path);
        },
    });
};

module.exports = constructor;
