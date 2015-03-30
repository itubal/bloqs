//----------------------------------------------------------------//
// This file is part of the bloqs Project                         //
//                                                                //
// Date: March 2015                                               //
// Author: Irene Sanz Nieto  <irene.sanz@bq.com>                  //
//----------------------------------------------------------------//

var newStatementBloq = function(bloqData, canvas, position, data) {
    "use strict";
    var connectionThreshold = 20; // px
    var bloq = newBloq(bloqData, canvas, position, data); //canvas.group().move(position[0], position[1]);
    bloq.getConnectionPosition = function(connectionType, bloqToConnect, inputID) {
        if (connectionType === 'up') {
            return {
                x: bloq.connections[connectionType].connectionPosition.x,
                y: bloq.connections[connectionType].connectionPosition.y - bloqToConnect.size.height
            };
        }
        if (connectionType === 'inputs') {
            console.log('--------------------------------------------------> MOVING DOWN');
            for (var k in bloq.connections[connectionType]) {
                //If the input is inline and there is not a bloq connected still
                if (bloq.connections[connectionType][k].inline === true && k === inputID && bloq.connections[connectionType][k].bloq === undefined) {
                    var delta = {
                        x: bloqToConnect.size.width - bloq.bloqInput.width,
                        y: bloqToConnect.size.height - bloq.bloqInput.height
                    };
                    utils.resizeBloq(bloq, delta);
                    delta = {
                        x: bloqToConnect.size.width - bloq.bloqInput.width,
                        y: 0
                    };
                    for (var i in bloq.UIElements) {
                        if (bloq.UIElements[i].id === parseInt(inputID, 10)) {
                            console.log('here pushing', bloq.UIElements[i].elementsToPush);
                            utils.pushElements(bloq, bloq.UIElements[i], delta);
                            break;
                        }
                    }
                }
                if (k > inputID) {
                    if (bloq.connections[connectionType][k].inline === false && bloq.connections[connectionType][k].movedDown === false) {
                        utils.moveConnector(bloq, bloq.connections[connectionType][k], {
                            x: 0,
                            y: bloqToConnect.size.height - k * connectionThreshold
                        });
                        //The connector has already been moved down once
                        bloq.connections[connectionType][k].movedDown = true;
                        bloq.connections[connectionType][k].movedUp = false;
                    }
                }
            }
            return bloq.connections[connectionType][inputID].connectionPosition;
        }
        return bloq.connections[connectionType].connectionPosition;
    };
    return bloq;
};