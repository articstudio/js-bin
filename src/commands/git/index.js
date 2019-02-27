'use strict';

let constructor = function (app) {
    let menu_option = {
        name: 'Git',
        value: app.abstracts.menu.extend({
            menu_title: 'Git',
            menu_opts: {
                backOption: false,
                exitOption: true
            },
            menu_choices: [
                {
                    name: 'Subtree Add',
                    value: 'git:subtree:add'
                },
                {
                    name: 'Subtree Push',
                    value: 'git:subtree:push'
                },
                {
                    name: 'Subtree Pull',
                    value: 'git:subtree:pull'
                },
                {
                    name: 'Subtree Remove',
                    value: 'git:subtree:remove'
                },
                {
                    name: 'Subtree Check',
                    value: 'git:subtree:check'
                }
            ]
        })
    };
    app.addMenuOption(menu_option);
    app.registerCommand(require('./subtree/add')(app));
    app.registerCommand(require('./subtree/pull')(app));
    app.registerCommand(require('./subtree/check')(app));
};

module.exports = constructor;