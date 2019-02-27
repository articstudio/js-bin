'use strict';

const fs = require('fs');

let constructor = function () {
    return {
        write: function (filename, path, options) {
            return fs.writeFileSync(filename, path, options);
        },
        exists: function (filename) {
            return fs.existsSync(filename);
        }
    };
};

module.exports = constructor;