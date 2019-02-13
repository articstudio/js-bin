module.exports = (function () {
    'use strict';

    return function (utils, manager) {

        // Dependencies
        manager.addDependency({
            alias: '_',
            name: 'lodash'
        });
        manager.addDependency({
            alias: ['$', 'jQuery'],
            name: 'jquery'
        });
        manager.addDependency('jquery-ui-dist/jquery-ui.js');
        manager.addDependency('bootstrap-sass');
        manager.addDependency('angular');
        //manager.addAngularModule('entooo');

    };
})();
