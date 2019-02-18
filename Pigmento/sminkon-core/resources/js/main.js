'use strict';

let modules = __ANGULAR_MODULES__ || [];
_ento.app = angular
        .module('ento', modules);

_ento.app.run(runFunc);

runFunc.$inject = ['$rootScope'];

function runFunc($rootScope) {
    var vm = this || {};
    $rootScope.$on('$destroy', function () {
        //vm.flushListeners();
    });
}
