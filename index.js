module.exports = (function () {
    'use strict';

    let utils = require('pigmento-sminkon-utils'),
        path = require('path');

    // Config Sminkon
    utils.config.addEntry(
        'loading', [
            path.resolve(__dirname, './resources/js/loading.js'),
            path.resolve(__dirname, './resources/sass/loading.scss')
        ]);
    utils.config.addEntry(
        'main', [
            path.resolve(__dirname, './resources/js/main.js'),
        ]);
    utils.config.setTemplate(path.resolve(__dirname, './resources/public/index.ejs'));

    utils.config.setAssets('images', path.resolve(__dirname, './resources/images'));
    utils.config.setAssets('i18n', path.resolve(__dirname, './resources/i18n'));
    utils.config.setAssets('', path.resolve(__dirname, './resources/public'));

    var exports = {};

    return exports;
})();
