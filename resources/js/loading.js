/* Basic loader */
let UserAgentParser = require('ua-parser-js'),
        outdatedBrowserRework = require('outdated-browser-rework'),
        loader = (function () {
            function _load(tag) {
                return function (url) {
                    return new Promise(function (resolve, reject) {
                        let element = document.createElement(tag),
                                parent = 'body',
                                attr = 'src';

                        element.onload = function () {
                            resolve(url);
                        };
                        element.onerror = function () {
                            reject(url);
                        };

                        switch (tag) {
                            case 'script':
                                element.defer = true;
                                break;
                            case 'link':
                                element.type = 'text/css';
                                element.rel = 'stylesheet';
                                attr = 'href';
                                parent = 'head';
                        }

                        element[attr] = url;
                        document[parent].appendChild(element);
                    });
                };
            }

            return {
                css: _load('link'),
                js: _load('script'),
                img: _load('img')
            };
        })();

/* Loading */
module.exports = (function () {
    'use strict';

    let w = window || {},
            d = document || {},
            parsedUserAgent = new UserAgentParser(window.navigator.userAgent).getResult(),
            entoLoader = function () {
                // Check is loading
                if (w.entoLoadingInit) {
                    return;
                }
                w.entoLoadingInit = true;

                let body = d.getElementsByTagName('body')[0],
                        wrapper = d.createElement('div'),
                        container = d.createElement('div'),
                        spinner = d.createElement('div'),
                        img = d.createElement('img'),
                        version = d.createElement('div'),
                        versionText = d.createTextNode('v' + _ento.version + '-' + _ento.hash + ''),
                        count = 0,
                        max = 5,
                        div,
                        allPromises = [],
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
                        loadDeferreds = function () {
                            (Array.isArray(_ento.css) ? _ento.css : [_ento.css]).map(function (css) {
                                allPromises.push(loader.css(css));
                            });
                            (Array.isArray(_ento.js) ? _ento.js : [_ento.js]).map(function (js) {
                                allPromises.push(loader.js(js));
                            });
                            Promise.all(allPromises).then(function () {
                                w.entoLoaded = true;
                                    console.log('Ento: Loaded');
                            }).catch(function () {
                                console.log('Ento: error loading CSS/JS');
                            });
                        };

                try {
                    w._ento = _ento || {};
                    createLoadingTemplate();
                    loadDeferreds();
                } catch (e) {
                    w.entoLoadingInit = true;
                    return;
                }

            },
            checkBrowser = function () {
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
            };

    // Loading variables
    w.entoLoadingInit = false;
    w.entoLoaded = false;

    // Check browser
    checkBrowser();

    // Load ento on window load
    var raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame;
    if (raf) {
        raf(function () {
            w.setTimeout(entoLoader, 0);
        });
    } else {
        w.addEventListener('load', entoLoader);
    }

})();
