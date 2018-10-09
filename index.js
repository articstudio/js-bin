module.exports = (function () {
    'use strict';

    let sminkon = require('pigmento-sminkon-config'),
            path = require('path');

    // Config Sminkon
    sminkon.addEntry('loading', path.resolve(__dirname, './resources/js/loading.js'));
    sminkon.setTemplate(path.resolve(__dirname, './resources/public/index.ejs'));

    var exports = {

    };

    return exports;
})();
