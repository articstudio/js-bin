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
                    name: 'Lint fix',
                    value: 'js:lint:fix'
                },
                {
                    name: 'Prettier',
                    value: 'js:prettier'
                },
                {
                    name: 'Prettier fix',
                    value: 'js:prettier:fix'
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
    app.registerCommand(require('./lint-fix')(app));
    app.registerCommand(require('./prettier')(app));
    app.registerCommand(require('./prettier-fix')(app));
    app.registerCommand(require('./test')(app));
};

module.exports = constructor;