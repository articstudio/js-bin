module.exports = (function () {
    'use strict';

    let config = {
        version: null,
        hash: function () {
            return new Date().getTime();
        },
        output: null,
        assets: {},
        entry: {},
        alias: {},
        plugins: [],
        images: [],
        rules: [],
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
        setOutput: function (value) {
            config.output = value
        },
        getOutput: function () {
            return config.output;
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
        //
        setAsset: function (key, value) {
            config.assets[key] = value;
        },
        getAsset: function (key) {
            return config.assets[key];
        },
        getAssets: function () {
            return config.assets;
        },
        //
        setAlias: function (key, value) {
            config.alias[key] = value;
        },
        getAlias: function (key) {
            return config.alias[key];
        },
        getAliases: function () {
            return config.alias;
        },
        //
        setRule: function (value) {
            config.rules.push(value);
        },
        getRules: function () {
            return config.rules;
        },
        //
        setPlugin: function (value) {
            config.plugins.push(value)
        },
        getPlugins: function () {
            return config.plugins;
        },
        //
        isProduction: function(){
            return !!(process.env.NODE_ENV === 'production');
        },
        //
        getConfig: function () {
            return {
                hash: config.hash,
                images: config.images,
                develop: !this.isProduction(),
                version: config.version
            };
        }
    };

    return exports;
})();
