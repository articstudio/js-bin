'use strict';

let constructor = function(app) {
    return {
        menu_title: '',
        menu_opts: {
            backOption: false,
            exitOption: true,
        },
        menu_choices: [],
        goBack: function() {
            return app.showMenu();
        },
        go: function(choice) {
            if (typeof choice === 'object') {
                return app.showMenu(choice);
            }
            return app.callCommand(choice);
        },
        run: function() {
            return this.show().then(choice => {
                if (!choice || choice === 'exit') {
                    return 0;
                }
                if (choice === 'back') {
                    return this.goBack();
                }
                return this.go(choice);
            });
        },
        show: function() {
            return app.utils.ui.menu(this.menu_title, this.menu_choices, this.menu_opts);
        },
        //
        extend: function(target) {
            return app.utils.extend(this, target);
        },
    };
};

module.exports = constructor;
