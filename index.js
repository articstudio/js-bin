module.exports = (function () {
    'use strict';

    let utils = require('pigmento-sminkon-utils'),
        path = require('path');

    // Loading
    utils.config.addEntry(
        'loading', [
            path.resolve(__dirname, './resources/js/loading.js'),
            path.resolve(__dirname, './resources/sass/loading.scss')
        ]);

    // Main
    utils.config.addEntry(
        'main', [
            path.resolve(__dirname, './resources/js/main.js'),
        ]);

    // Template
    utils.config.setTemplate(path.resolve(__dirname, './resources/public/index.ejs'));

    // Assets
    utils.config.setAsset('images', path.resolve(__dirname, './resources/images'));
    utils.config.setAsset('i18n', path.resolve(__dirname, './resources/i18n'));
    //utils.config.setAsset('', path.resolve(__dirname, './resources/public'));

    // Base64 images
    utils.config.addImage('icon', utils.base64('./resources/images/icon.svg', {base: __dirname}));
    utils.config.addImage('logo_author', utils.base64('./resources/images/author.svg', {base: __dirname}));
    utils.config.addImage('logo', utils.base64('./resources/images/logo.svg', {base: __dirname}));
    utils.config.addImage('logo_horizontal', utils.base64('./resources/images/logo_horizontal.svg', {base: __dirname}));

    let exports = {};

    return exports;
})();
