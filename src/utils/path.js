'use strict';

const path = require('path');

let constructor = function() {
    return {
        resolve: function() {
            return path.resolve(...arguments);
        },
        basename: function(path) {
            return path.basename(path);
        },
        dirname: function(path) {
            return path.dirname(path);
        },
    };
};

module.exports = constructor;
