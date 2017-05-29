/*global require */
'use strict';

var _ = require('lodash'),
    utils = require('./../../../build-utils'),
    StatementBloq = require('./../../../statementBloq');

/**
 * Bloq name: buzzer
 *
 * Bloq type: Statement
 *
 * Description: It turns on a specific buzzer, selectable
 *              from a first drop-down, with a basic note,
 *              selectable from a second drop-down, during
 *              a given period of time.
 *
 * Return type: none
 */

var mBotLedMatrix = _.merge(_.clone(StatementBloq, true), {

    name: 'mBotLedMatrix',
    bloqClass: 'bloq-mbot-color',
    content: [
        [{
            alias: 'text',
            value: 'Dibujar'
        }, {
            id: 'DRAW',
            alias: 'dotsMatrix',
            options: {
                rows: 8,
                columns: 16
            },
            value: '0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0'
        }, {
            alias: 'text',
            value: 'en la'
        }, {
            id: 'LEDMATRIX',
            alias: 'dynamicDropdown',
            options: 'ledMatrix'
        }]
    ],
    code: '',
    arduino: {
        needInstanceOf: [{
            name: '{LEDMATRIX}_bitmap[16]',
            type: 'uint8_t',
            equals: '{ 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0}'

        }],
        extraFunctionCode: 'void setMatrix(uint8_t pos0, uint8_t pos1, uint8_t pos2,uint8_t pos3, uint8_t pos4,uint8_t pos5, uint8_t pos6,uint8_t pos7, uint8_t pos8,uint8_t pos9, uint8_t pos10,uint8_t pos11, uint8_t pos12,uint8_t pos13, uint8_t pos14,uint8_t pos15, uint8_t * m) {\nm[0] = pos0;\n    m[1] = pos1;\nm[2] = pos2;\nm[3] = pos3;\nm[4] = pos4;\nm[5] = pos5;\nm[6] = pos6;\nm[7] = pos7;\nm[8] = pos8;\nm[9] = pos9;\nm[10] = pos10;\nm[11] = pos11;\nm[12] = pos12;\nm[13] = pos13;\nm[14] = pos14;\nm[15] = pos15;\n}',
        code: 'setMatrix({DRAW}, {LEDMATRIX}_bitmap);\n{LEDMATRIX}.drawBitmap(0,0, sizeof({LEDMATRIX}_bitmap), {LEDMATRIX}_bitmap);'
    }
});
utils.preprocessBloq(mBotLedMatrix);

module.exports = mBotLedMatrix;