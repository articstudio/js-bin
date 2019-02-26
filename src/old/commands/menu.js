'use strict';

let constructor = function (app) {

    return app.abstracts.menu.extend({
        name: 'menu',
        description: 'Commands menu',
        opts: {},
        alias: null,
        menu_title: 'Select one to start',
        menu_opts: {
            backOption: false,
            exitOption: true
        },
        menu_choices: [
            {
                name: 'Git',
                value: 'git'
            },
            {
                name: 'JS',
                value: 'js'
            },
            {
                name: 'Package json',
                value: 'package'
            }
        ]
    });
};

module.exports = constructor;