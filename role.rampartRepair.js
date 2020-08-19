var roleRampartRepair = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART);
                    }
        });
        var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }
        });

        var lowRampart = _.min(targets, function(rampart) { return rampart.hits; });
        var currentStorage = _.max(sources, function(source) { return source.store.getUsedCapacity(RESOURCE_ENERGY); });
        creep.memory.rampart = lowRampart.id;
        if(!creep.memory.rampart){
            creep.memory.rampart = lowRampart.id;
        }
        else{
           /* var currentRoad = targets.filter(road => {
                return road.id === creep.memory.road;
            })*/
            var currentRampart = Game.getObjectById(creep.memory.rampart);

            if(creep.memory.currentRampart > 1180)
            {
              currentRampart = lowRampart;
              creep.memory.rampart = currentRampart.id;
              creep.memory.currentRampart = 0;
            }
            if(creep.store.getUsedCapacity() <= 0)
            {
                 if(creep.withdraw(currentStorage, RESOURCE_ENERGY) == -9) {
                    creep.moveTo(currentStorage, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else
            {
                var storeBefore = creep.store.getFreeCapacity();
                if(creep.repair(currentRampart) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(currentRampart, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
                creep.memory.currentRampart -= creep.store.getFreeCapacity() - storeBefore;
            }

        }

    }
}
module.exports = roleRampartRepair;
