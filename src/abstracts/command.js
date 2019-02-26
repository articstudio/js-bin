'use strict';

let constructor = function (app) {
    return {
        name: '',
        description: '',
        alias: null,
        options: [],
        action: function () {},
        //
        extend: function (target) {
            return app.utils.extend(this, target);
        },
        //
        exit: function (code = 0) {
            process.exit(code);
        },
        exec: function (cmd, exit = true) {
            let response = app.utils.shell.call(cmd, app.getPath(), false);
            if (exit) {
                this.exit(response.code);
            }
            return response;
        }
    };
};

module.exports = constructor;