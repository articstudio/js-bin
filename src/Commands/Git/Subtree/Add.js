const app = require('../../../Application');


let constructor = function () {

    console.log("ADD SUBTREE");
    console.log(app.getPackage());
    return {
        execute: function () {
            
        }
    }
};

module.exports = constructor;