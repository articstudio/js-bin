/* Basic loader */
let load = require('pigmento-sminkon-utils').loader;
let UserAgentParser = require('ua-parser-js');
let outdatedBrowserRework = require('outdated-browser-rework');

/* Loading */
module.exports = (function () {
    'use strict';

    var w = window || {},
            d = document || {};

    w.entoLoadingInit = false;
    w.entoLoaded = false;
    var entoLoader = function () {

        if (w.entoLoadingInit) {
            return;
        }

        w.entoLoadingInit = true;

        const promiseSerial = function (fs) {
            return  fs.reduce(function (p, f) {
                return p.then(function (result) {
                    return f.then();
                });
            }, Promise.resolve([]));
        };

        var body = d.getElementsByTagName('body')[0],
                head = d.getElementsByTagName('head')[0],
                wrapper = d.createElement('div'),
                container = d.createElement('div'),
                spinner = d.createElement('div'),
                img = d.createElement('img'),
                version = d.createElement('div'),
                versionText = d.createTextNode('v' + _ento.version + '-' + _ento.hash + ''),
                count = 0,
                max = 5,
                div,
                cache = {
                    css: null,
                    js: null
                },
                countScripts = 0,
                totalScripts = 0,
                createLoadingTemplate = function () {
                    wrapper.id = 'ento-loading-wrapper';
                    wrapper.setAttribute('data-ng-show', 'html.showPreLoader');
                    container.id = 'ento-loading';
                    spinner.className = 'spinner';
                    img.className = 'logo';
                    img.src = _ento.logo;
                    for (count; count < max; ++count)
                    {
                        div = d.createElement('div');
                        spinner.appendChild(div);
                    }
                    container.appendChild(img);
                    container.appendChild(spinner);
                    version.className = 'version';
                    version.appendChild(versionText);
                    container.appendChild(version);
                    wrapper.appendChild(container);
                    body.insertBefore(wrapper, body.firstChild);
                },
                loadDeferredCSS = function (cb) {
                    var l = [], i;
                    for (i in _ento.css) {
                        l.push(load.css(_ento.css[i]));
                    }
                    return Promise.all(l);
                },
                loadDeferredJS = function () {
                    const fsm = _ento.js.map(function (s) {
                        return load.js(s);
                    });

                    return promiseSerial(fsm);
                },
                loadDeferreds = function () {
                    load.async('style', _ento.css).then(function (response) {
                        cache.css = response;
                        load.async('script', _ento.js).then(function (response) {
                            cache.js = response;
                            //console.log('async OK', response);

                            w.entoLoaded = true;
                            console.log('Ento: Loaded');
                        }, function (response) {
                            console.log('Ento: error loading JS');
                        });
                    }, function (response) {
                        console.log('Ento: error loading CSS');
                    });
                };

        try {
            w._ento = _ento || {};
            createLoadingTemplate();
            var cache_hash = localStorage.getItem('deferreds_cache_hash');
            if (cache_hash === _ento.hash) {

            } else {
                loadDeferreds();
            }
        } catch (e) {
            w.entoLoadingInit = true;
            return;
        }

    };

    var parsedUserAgent = new UserAgentParser(window.navigator.userAgent).getResult();
    if (parsedUserAgent.browser.name && parsedUserAgent.browser.name.indexOf('WebView') === -1 && parsedUserAgent.browser.name.indexOf('WebKit') === -1) {
        outdatedBrowserRework({
            browserSupport: {
                'Chrome': 57,
                'Edge': 38,
                'Safari': 10,
                'Mobile Safari': 10,
                'Firefox': 50,
                'IE': false
            },
            requireChromeOnAndroid: true,
            backgroundColor: '#f2dede',
            textColor: '#333',
            language: 'es'
        });
    } else {
        // Webview
        _ento.webview = parsedUserAgent.os.name;
    }


    var raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame;
    if (raf) {
        raf(function () {
            w.setTimeout(entoLoader, 0);
        });
    } else {
        w.addEventListener('load', entoLoader);
    }

})();
