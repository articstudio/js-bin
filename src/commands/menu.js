'use strict';

let constructor = function (app) {
    return app.abstracts.menu.extend({
        menu_title: 'JSBIN - ' + app.getPackage().version,
        menu_opts: {
            backOption: false,
            exitOption: true
        },
        menu_choices: app.getMenuOptions()
    });
};

module.exports = constructor;