module.exports = (function () {
    'use strict';

    let exports = {
        config: require('./src/config.js'),
        base64: require('./src/base64.js'),
        loader: require('./src/loader')
    };

    exports.config.setAlias('fs', 'mime/mime');

    return exports;
})();
