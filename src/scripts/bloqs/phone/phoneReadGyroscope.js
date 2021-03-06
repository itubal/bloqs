/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../build-utils'),
    OutputBloq = require('./../outputBloq');

/**
 * Bloq name: readSensor
 *
 * Bloq type: Output
 *
 * Description: It returns the measurement of a specific
 *              sensor, selectable from a drop-down.
 *
 * Return type: sensor's return type
 */

var phoneReadGyroscope = _.merge(_.clone(OutputBloq, true), {
    name: 'phoneReadGyroscope',
    bloqClass: 'bloq-phone-read-gyros',
    content: [
        [{
            alias: 'text',
            value: 'bloq-phone-gyroscope'
        }, {
            id: 'AXIS',
            alias: 'staticDropdown',
            options: [{
                label: 'x',
                value: '"x"'
            }, {
                label: 'y',
                value: '"y"'
            }, {
                label: 'z',
                value: '"z"'
            }]
        }, {
            alias: 'text',
            value: 'bloq-phone-of'
        }, {
            id: 'PHONE',
            alias: 'dynamicDropdown',
            options: 'serialElements'
        }, {
            alias: 'text',
            value: '(rad/s)'
        }]
    ],
    code: '',
    arduino: {
        includes: ['BitbloqSoftwareSerial.h'],
        setupExtraCode: '{PHONE}.begin(º[{PHONE}.baudRate]);',
        needInstanceOf: [{
            name: '{PHONE}',
            type: 'bqSoftwareSerial',
            arguments: [
                'º[{PHONE}.pin.rx]',
                'º[{PHONE}.pin.tx]',
                'º[{PHONE}.baudRate]'
            ]
        }],
        extraFunctionCode: 'float getGyroscope(String axis,bqSoftwareSerial & phone){phone.println(String("readGyros-")+String(axis));String data="";while(data==""){data=phone.readString();}return data.toFloat();}',
        code: 'getGyroscope({AXIS}, {PHONE})'
    },
    returnType: {
        type: 'simple',
        value: 'float'
    },
    python: {
        codeLines: [{
            code: 'recibir_giroscopio(server_sock, {AXIS})'
        }]
    }
});

utils.preprocessBloq(phoneReadGyroscope);

module.exports = phoneReadGyroscope;