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
        images: [],
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
        addImage: function (key, value) {
            config.images[key] = value;

        },
        getImages: function () {
            return config.images;
        },
        //
        setVersion: function (value) {
            config.version = value;
        },
        setAsset: function (key, value) {
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
                images: config.images,
                develop: !!(process.env.NODE_ENV !== 'production'),
                version: config.version
            };
        }
    };

    return exports;
})();
