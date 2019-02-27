module.exports = (function () {
    'use strict';

    return function (utils, manager) {
        let path = require('path'),
                data = utils.config.getData();

        // Prodaisa logo
        if (data.config.skin && data.config.skin === 'prodaisa') {
            utils.config.addImage('logo', utils.base64('./resources/images/logo_prodaisa.png', {base: __dirname}));
            utils.config.addImage('logo_horizontal', utils.base64('./resources/images/logo_prodaisa-h.svg', {base: __dirname}));
        }

        // Sass
        manager.addScript(path.resolve(__dirname, './resources/sass/prodaisa.scss'));
    };
})();
