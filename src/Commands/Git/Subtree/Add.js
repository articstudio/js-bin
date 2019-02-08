let SubtreesConfig = require('../utils/SubstreesConfig');
let AbstractCommand = require('../../../AbstractCommand');
let AbstractMenuCommand = require('../../../AbstractMenuCommand');

let constructor = function () {

    return {
        execute: function () {
            console.log("ADD SUBTREE");
            let packages = SubtreesConfig.getSubtrees();
            let menu_options = [packages,
                {
                    name: "New package",
                    value: "new",
                    callback: function () {
                        //return new Remove().execute();
                    }
                }
            ];
            console.log(menu_options);
            selectPackageMenu("AAAAAAAAA", menu_options);
            //showQuestion().then(answer => {return answer});

        }
    };

    function showQuestion() {
        return AbstractCommand.ask('Let me a name of package to add subtree');
    }

    function selectPackageMenu(title, menu_options) {
        new AbstractMenuCommand({
            name: 'menu',
            message: title,
            choices: menu_options
        })
            .prepare()
            .execute()
            .then(function (callback) {
                return callback ? callback() : -1;
            });
    }
};

module.exports = constructor;