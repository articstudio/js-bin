'use strict';

let constructor = function(app) {
    return app.abstracts.command.extend({
        name: 'js:prettier',
        description: 'JavaScript Prettier',
        alias: 'prettier',
        action: function() {
            let path = app.getPath();
            let file = app.utils.path.resolve(path, './.prettierrc');
            let file_ignore = app.utils.path.resolve(path, './.prettierignore');
            this.exec(
                './node_modules/.bin/prettier --config ' +
                    file +
                    ' --ignore-path ' +
                    file_ignore +
                    ' --check "' +
                    path +
                    '/**/*.js"'
            );
        },
    });
};

module.exports = constructor;
