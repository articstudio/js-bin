'use strict';

let constructor = function (app) {
    return function (source, target) {
        return app.utils._.assign({}, app.utils._.cloneDeep(source), target);
    };
};

module.exports = constructor;