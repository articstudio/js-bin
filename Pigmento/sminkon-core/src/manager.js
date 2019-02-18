module.exports = (function () {
    'use strict';

    // Configuration
    let config = {
        dependencies: [],
        scripts: [],
        angular_modules: []
    };

    // Return exports
    return {
        addDependency: function(dependency){
            config.dependencies.push(dependency);
        },
        getDependencies: function(){
            return [...new Set(config.dependencies)];
        },
        //
        addScript: function(script){
            config.scripts.push(script);
        },
        getScripts: function(){
            return [...new Set(config.scripts)];
        },
        //
        getImports: function(){
            return [...new Set(config.dependencies.concat(config.scripts))];
        },
        //
        addAngularModule: function(module){
            config.angular_modules.push(module);
        },
        getAngularModules: function(){
            return [...new Set(config.angular_modules)];
        }
    };
})();
