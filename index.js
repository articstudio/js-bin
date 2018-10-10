module.exports = (function () {
    'use strict';

    let sminkon = require('pigmento-sminkon-config'),
        path = require('path');

    // Config Sminkon
    sminkon.addEntry(
        'loading', [
            path.resolve(__dirname, './resources/js/loading.js'),
            path.resolve(__dirname, './resources/sass/loading.scss')
        ]);
    sminkon.addEntry(
        'main', [
            path.resolve(__dirname, './resources/js/main.js'),
        ]);
    sminkon.setTemplate(path.resolve(__dirname, './resources/public/index.ejs'));

    sminkon.setAssets('images', path.resolve(__dirname, './resources/images'));
    sminkon.setAssets('i18n', path.resolve(__dirname, './resources/i18n'));
    sminkon.setAssets('', path.resolve(__dirname, './resources/public'));

    var exports = {};

    return exports;
})();
