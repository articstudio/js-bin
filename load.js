module.exports = (function () {

    let utils = require('pigmento-sminkon-utils');

    function loadAssets() {

        let i;
        // Static assets
        let assets = utils.config.getAssets(),
            assetsObjs = [];
        for (i in assets) {
            assetsObjs.push({
                from: assets[i],
                to: i,
                toType: 'dir',
                ignore: ['*.ejs']
            });
        }

        return assetsObjs;
    }

    let exports = {
        assets: loadAssets
    };

    return exports;
})();