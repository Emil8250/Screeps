var roleHauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);
        var currentStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE);
            }
    
        })[0];

        var currentContainer = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
    
        })[2];

        if(droppedResources.length > 0){
            creep.pickup(droppedResources[0]);
            if(creep.pickup(droppedResources[0] == ERR_NOT_IN_RANGE) && creep.store.getFreeCapacity() != 0)
            {
                creep.moveTo(droppedResources[0])
            }
            else if(creep.store.getFreeCapacity() == 0){
                if(creep.transfer(currentStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(currentStorage);
                }
            }
        }
	creep.say(creep.store.getUsedCapacity());
        if(creep.store.getUsedCapacity() > 0)
        {
            if(creep.transfer(currentStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(currentStorage);
            }
        }
	}
};

module.exports = roleHauler;
