module.exports = (function () {
    'use strict';

    let config = {
        version: null,
        hash: function () {
                    return new Date().getTime();
                },
        assets: {},
        entry: {},
        alias: [],
        template: null
    };

    let exports = {
        setTemplate: function (value) {
            config.template = value;
        },
        getTemplate: function () {
            return config.template;
        },
        //
        addEntry: function (key, value) {
            config.entry[key] = value;

        },
        getEntries: function () {
            return config.entry;
        },
        //
        setVersion: function (value) {
            config.version = value;
        },
        setAssets: function (key, value) {
            config.assets[key] = value;
        },
        getAsset: function(key) {
            return config.assets[key];
        },
        getAssets: function(){
            return config.assets;
        },
        //
        getConfig: function () {
            return {
                hash: config.hash,
                logo_author: 'images/author.svg',
                logo: 'images/logo.svg',
                logo_horizontal: 'images/logo_horizontal.svg',
                icon: 'images/icon.svg',
                develop: true,
                version: config.version,
                assets: config.assets
            };
        }
    };

    return exports;
})();
