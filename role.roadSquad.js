var roleRoadSquad = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD);
                    }
        });
        var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
        });
        var currentContainer = containers[1];
        var lowRoad = _.min(targets, function(Road) { return Road.hits; });
        if(!creep.memory.road){
            creep.memory.road = lowRoad.id;
        }
        else{
           /* var currentRoad = targets.filter(road => {
                return road.id === creep.memory.road;
            })*/
            var currentRoad = Game.getObjectById(creep.memory.road);
            if(currentRoad === null)
                currentRoad = "";

            if(currentRoad.hits == currentRoad.hitsMax)
            {
                creep.say('Full HP');
                creep.memory.road = ""
            }
            if(lowRoad.hits < 15000 && currentRoad > 25000)
            {
                creep.memory.road = lowRoad.id;
                currentRoad = lowRoad;
            }
            if(creep.store.getUsedCapacity() <= 0)
            {
                 if(creep.withdraw(currentContainer, RESOURCE_ENERGY) == -9) {
                    creep.moveTo(currentRoad, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else
            {
                if(creep.repair(currentRoad) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(currentRoad, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }

        }

    }
}
module.exports = roleRoadSquad;
