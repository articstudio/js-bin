'use strict';

let constructor = function (app) {
    return {
        name: '',
        description: '',
        opts: {},
        alias: null,
        action: function () {}
    };
};

module.exports = constructor;