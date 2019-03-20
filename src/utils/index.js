'use strict';

let constructor = function(app) {
    return {
        path: require('./path')(app),
        shell: require('./shell')(app),
        fs: require('./fs')(app),
        package: require('./package')(app),
        git: require('./git')(app),
        ui: require('./ui')(app),
        extend: require('./extend')(app),
        _: require('lodash'),
        promised: function(result) {
            return new Promise(resolve => {
                resolve(result);
            });
        },
        parseBool: function(v) {
            return v === 'true';
        },
    };
};

module.exports = constructor;
