module.exports = (function () {
    'use strict';

    return function (utils) {
        let path = require('path'),
                provide = require('webpack').ProvidePlugin,
                define = require('webpack').DefinePlugin,
                config = require(path.resolve(__dirname, './src/config.js')),
                inject = require(path.resolve(__dirname, './src/inject.js')),
                manager = require(path.resolve(__dirname, './src/manager.js')),
                dependencies = utils.config.getData().dependencies,
                files = utils.config.getData().config.webpack.files,
                rootDir = utils.config.getRootDirname(),
                i, j, name, pigmento, imports, angular_modules, injects = {}, vendors = [];

        // Configuration
        config(utils, manager);

        // Injection
        inject(utils, manager);

        // Require all pigmento packages
        for (i in dependencies) {
            name = i.split('-');
            // Excepts "pigmento-sminkon-utils" &  "pigmento-sminkon-core"
            if (name[0] !== 'pigmento' || i === 'pigmento-sminkon-utils' || i === 'pigmento-sminkon-core') {
                continue;
            }
            pigmento = require(i);
            if (typeof pigmento !== 'function') {
                continue;
            }
            pigmento(utils, manager);
        }

        // Require all project files
        for (i in files) {
            manager.addScript(path.resolve(rootDir, files[i]));
        }

        // Define angular modules
        angular_modules = manager.getAngularModules();
        utils.config.setPlugin(new define({
            __ANGULAR_MODULES__:JSON.stringify(angular_modules)
        }));

        // Inject imports
        imports = manager.getImports();
        for (i in imports) {
            if (typeof imports[i] !== 'object') {
                vendors.push(imports[i]);
                continue;
            }
            if (!imports[i].name) {
                continue;
            }
            vendors.push(imports[i].name);
            if (!imports[i].alias) {
                continue;
            }
            if (!Array.isArray(imports[i].alias)) {
                imports[i].alias = [imports[i].alias];
            }
            for (j in imports[i].alias) {
                injects[imports[i].alias[j]] = imports[i].name;
            }
        }
        utils.config.setPlugin(new provide(injects));

        // Main
        utils.config.addEntry('main', vendors.concat([
            path.resolve(__dirname, './resources/js/main.js'),
            path.resolve(__dirname, './resources/sass/main.scss')
        ]));
    };
})();
