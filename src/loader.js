'use strict';

module.exports = (function () {

    var _createAsyncTag = function (tag) {
        var element = _createTag(tag);
        return [element, new Promise(function (resolve, reject) {
            element.onload = function () {
                return resolve(element);
            };
            element.onerror = function () {
                return reject(element);
            };
        })];
    };

    var _createTag = function (tag) {
        var element = document.createElement(tag),
            parent = 'body';
        switch (tag) {
            case 'script':
                element.async = true;
                break;
            case 'style':
                element.type = 'text/css';
                parent = 'head';
                break;
            case 'link':
                element.type = 'text/css';
                element.rel = 'stylesheet';
                parent = 'head';
                break;
        }
        document[parent].appendChild(element);
        return element;
    };

    var _load = function (tag, content) {
        var e = _createTag(tag),
            attr = 'text';
        switch (tag) {
            case 'script':
                break;
            case 'style':
                attr = 'innerHTML';
                break;
        }
        e[attr] = content;
        return e;
    };

    var _loadAsync = function (tag, url) {
        return new Promise(function (resolve, reject) {
            if (!window.XMLHttpRequest)
            {
                reject(url);
            }
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                //console.log('a', this.responseText);
                var e = _load(tag, this.responseText);
                resolve({url: url, content: this.responseText});
            };
            xhr.open('GET', url, true);
            xhr.send();
        });

    };

    return {
        sync: _load,
        async: _loadAsync
    }
        ;
})();