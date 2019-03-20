'use strict';

let constructor = function(app) {
    return app.abstracts.command.extend({
        name: 'package:check',
        description: 'Package Check',
        options: [['-s, --save', 'Save in package.json']],
        action: function(cmd) {
            let save = cmd.save || false;
            let file = app.utils.path.resolve(app.getPath(), './package.json');
            this.exec('./node_modules/.bin/ncu --packageFile ' + file + (save ? ' --upgrade' : ''));
        },
    });
};

module.exports = constructor;
