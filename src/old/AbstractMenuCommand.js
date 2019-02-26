'use strict';

const inquirer = require('inquirer');
const _ = require('lodash');

let constructor = function(config){
    return {
        config: Object.assign({
            type: 'list',
            message: 'Title',
            name: _.random(0, 999999),
            choices: [],
            pageSize: 10
        }, config),
        prepare: function(){
            this.config.choices.push(new inquirer.Separator());
            this.config.choices.push({name: "Exit", value: "exit"});
            return this;
        },
        callChoiceCallback: function(choiceValue) {
            let choice = _.find(this.config.choices, {value:choiceValue});
            return (choice && choice.callback) ? choice.callback : choiceValue;
        },
        execute: function() {
            let _self = this;
            return inquirer
                .prompt(this.config)
                .then(function (choice) {
                    if (choice.menu === 'exit') {
                        return false;
                    }
                    return _self.callChoiceCallback(choice.menu);
                });
        }
    };
};

module.exports = constructor;