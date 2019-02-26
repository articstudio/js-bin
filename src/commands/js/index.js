'use strict';

let constructor = function (app) {
    let menu_option = {
        name: 'JS',
        value: app.abstracts.menu.extend({
            menu_title: 'JS',
            menu_opts: {
                backOption: false,
                exitOption: true
            },
            menu_choices: [
                {
                    name: 'Lint',
                    value: 'js:lint'
                },
                {
                    name: 'Test',
                    value: 'js:test'
                }
            ]
        })
    };
    app.addMenuOption(menu_option);
    app.registerCommand(require('./lint')(app));
    app.registerCommand(require('./test')(app));
};

module.exports = constructor;