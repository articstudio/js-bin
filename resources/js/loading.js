
/* Basic loader */
//let load = require('@prepair/basic-loader');
let load = require('./lib/loader');
let UserAgentParser = require('ua-parser-js');
let outdatedBrowserRework = require('outdated-browser-rework');


/* Loading */
module.exports = (function () {
    'use strict';

    var w = window || {},
            d = document || {};

    w.icebergsLoadingInit = false;
    w.icebergsLoaded = false;
    var icebergsLoader = function () {

        if (w.icebergsLoadingInit) {
            return;
        }

        w.icebergsLoadingInit = true;

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
                versionText = d.createTextNode('v' + _icebergs.version + '-' + _icebergs.hash + ''),
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
                    img.src = _icebergs.logo;
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
                    for (i in _icebergs.css) {
                        l.push(load.css(_icebergs.css[i]));
                    }
                    return Promise.all(l);
                },
                loadDeferredJS = function () {
                    const fsm = _icebergs.js.map(function (s) {
                        return load.js(s);
                    });

                    return promiseSerial(fsm);
                },
                loadDeferreds = function () {
                    load.async('style', _icebergs.css).then(function (response) {
                        cache.css = response;
                        load.async('script', _icebergs.js).then(function (response) {
                            cache.js = response;
                            //console.log('async OK', response);

                            w.icebergsLoaded = true;
                            console.log('Icebergs: Loaded');
                        }, function (response) {
                            console.log('Icebergs: error loading JS');
                        });
                    }, function (response) {
                        console.log('Icebergs: error loading CSS');
                    });

//                    load.css(_icebergs.css).then(function (result) {
//                        console.log(result);
//                        cache.css = {
//                            url: result.url,
//                            content: result.element.innerHTML
//                        };
//                        load.js(_icebergs.js).then(function (result) {
//                            console.log(result);
//                            cache.js = {
//                                url: result.url,
//                                content: result.element.innerHTML
//                            };
//                            console.log(cache);
//                            //w.icebergsLoaded = true;
//                            console.log('Icebergs: Loaded');
//                        }).catch(function (e) {
//                            console.log('Icebergs: error loading JS', e);
//                        });
//                    }).catch(function (e) {
//                        console.log('Icebergs: error loading CSS', e);
//                    });
                };

        try {
            w._icebergs = _icebergs || {};
            createLoadingTemplate();
            var cache_hash = localStorage.getItem('deferreds_cache_hash');
            if (cache_hash === _icebergs.hash) {

            } else {
                loadDeferreds();
            }
        } catch (e) {
            w.icebergsLoadingInit = true;
            return;
        }

    };

    var parsedUserAgent = new UserAgentParser(window.navigator.userAgent).getResult();
    //console.log(parsedUserAgent);
    if (parsedUserAgent.browser.name && parsedUserAgent.browser.name.indexOf('WebView') === -1 && parsedUserAgent.browser.name.indexOf('WebKit') === -1) {
        //alert(parsedUserAgent.ua);
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
        _icebergs.webview = parsedUserAgent.os.name;
    }


    var raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame;
    if (raf) {
        raf(function () {
            w.setTimeout(icebergsLoader, 0);
        });
    } else {
        w.addEventListener('load', icebergsLoader);
    }

})();