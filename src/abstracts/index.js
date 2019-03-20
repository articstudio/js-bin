'use strict';

let constructor = function(app) {
    return {
        command: require('./command')(app),
        menu: require('./menu')(app),
    };
};

module.exports = constructor;
