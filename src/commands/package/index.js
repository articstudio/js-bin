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
                    name: 'Subpackage Update',
                    value: 'package:sub:update'
                },
                {
                    name: 'Subpackage Publish',
                    value: 'package:sub:publish'
                },
                {
                    name: 'Subpackage Load',
                    value: 'package:sub:load'
                }
            ]
        })
    };
    app.addMenuOption(menu_option);
    app.registerCommand(require('./install')(app));
    app.registerCommand(require('./subpackage/update')(app));
};

module.exports = constructor;