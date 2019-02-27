'use strict';

let constructor = function (app) {
    let menu_option = {
        name: 'Package.json',
        value: app.abstracts.menu.extend({
            menu_title: 'Package.json',
            menu_opts: {
                backOption: false,
                exitOption: true
            },
            menu_choices: [
                {
                    name: 'Package Install',
                    value: 'package:install'
                },
                {
                    name: 'Package Update',
                    value: 'package:update'
                },
                {
                    name: 'Subpackage Publish',
                    value: 'package:publish'
                },
                {
                    name: 'Package Load',
                    value: 'package:load'
                }
            ]
        })
    };
    app.addMenuOption(menu_option);
    app.registerCommand(require('./install')(app));
    app.registerCommand(require('./update')(app));
    app.registerCommand(require('./publish')(app));
    app.registerCommand(require('./load')(app));
};

module.exports = constructor;