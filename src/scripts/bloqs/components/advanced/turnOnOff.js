/*global require */
'use strict';

var _ = require('lodash');
var OutputBloq = require('./../../outputBloq');

var bloq = _.merge(_.clone(OutputBloq, true), {

    name: 'turnOnOffAdvanced',
    content: [
        [{
            id: 'VALUE',
            alias: 'dropdown',
            options: [{label:'Encender',value:'HIGH'}, {label:'Apagar', value: 'LOW'}]
        }]
    ],
    code: '{VALUE}'
});

module.exports = bloq;