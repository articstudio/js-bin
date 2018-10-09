

var fs = require('fs'),
    path = require('path'),
    mime = require('mime');

module.exports = (function () {
    'use strict';

    var exports = {};

    exports = function (filename, options) {

        var filepath,
            mtype,
            sfile,
            simg64,
            rExternal = /^(http|https|\/\/)/,
            rData = /^data:/,
            rSchemeless = /^\/\//;

        options = options || {};
        options.base = options.base || process.cwd();

        if (rData.test(filename) || rExternal.test(filename) || rSchemeless.test(filename))
        {
            console.log('img2base64 => External image: ' + filename);
            return filename;
        }

        filepath = path.join(options.base, filename);

        if (!fs.existsSync(filepath) || !fs.lstatSync(filepath).isFile()) {
            console.log('img2base64 => File not found: ' + filepath);
            return filename;
        }

        mtype = mime.lookup(filepath);

        if (mtype === 'application/octet-stream') {
            console.log('img2base64 => Mimetype not supported: ' + mtype + ' / ' + filename);
            return filename;
        }

        sfile = fs.readFileSync(filepath);
        simg64 = new Buffer(sfile).toString('base64');

        return 'data:' + mtype + ';base64,' + simg64;
    };

    return exports;
})();