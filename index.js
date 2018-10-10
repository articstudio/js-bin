module.exports = (function () {
    'use strict';

    let exports = {
        config: require('./src/config.js'),
        base64: require('./src/base64.js')
    };

    return exports;
})();
