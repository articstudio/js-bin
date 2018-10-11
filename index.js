module.exports = (function () {
    'use strict';

    let load = require('./load'),
        utils = require('pigmento-sminkon-utils'),
        clean = require('clean-webpack-plugin'),
        html = require('html-webpack-plugin'),
        dotenv = require('dotenv-webpack'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        CopyWebpackPlugin = require('copy-webpack-plugin'),
        UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
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
    utils.config.setAsset('', path.resolve(__dirname, './resources/public'));

    // Base64 images
    utils.config.addImage('icon', utils.base64('./resources/images/icon.svg', {base: __dirname}));
    utils.config.addImage('logo_author', utils.base64('./resources/images/author.svg', {base: __dirname}));
    utils.config.addImage('logo', utils.base64('./resources/images/logo.svg', {base: __dirname}));
    utils.config.addImage('logo_horizontal', utils.base64('./resources/images/logo_horizontal.svg', {base: __dirname}));

    //Rules
    utils.config.setRule({
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
    });

    //Plugins - Base
    utils.config.setPlugin(new dotenv({}));
    utils.config.setPlugin(new clean([
        path.resolve(__dirname, utils.config.getOutput())
    ], {}));
    utils.config.setPlugin(new html({
        ento: utils.config.getConfig(),
        template: utils.config.getTemplate(),
        inject: false,
        hash: true,
        minify: {}
    }));
    utils.config.setPlugin(new ExtractTextPlugin({ // define where to save the file
        filename: './css/[name].css',
        allChunks: true,
    }));
    utils.config.setPlugin(new CopyWebpackPlugin(load.assets()));


    //Production plugins
    if (true || utils.config.isProduction()) {
        utils.config.setPlugin(new UglifyJsPlugin());
    }

    let exports = {};

    return exports;
})();
