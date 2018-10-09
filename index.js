module.exports = (function () {
    'use strict';

    let sminkon = require('pigmento-sminkon-config'),
        path = require('path');

    // Config Sminkon
    sminkon.addEntry('loading', [
        path.resolve(__dirname, './resources/js/loading.js'),
        path.resolve(__dirname, './resources/sass/loading.scss')
    ]);
    sminkon.setTemplate(path.resolve(__dirname, './resources/public/index.ejs'));

    //sminkon.setAssets('loading_js', '/js/loading.js');
    //sminkon.setAssets('loading_css', '/css/loading.css');

    var exports = {};

    return exports;
})();
