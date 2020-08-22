var roleFetchMineral = {

    /** @param {Creep} creep **/
    run: function(creep) {
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

        if(creep.store.getFreeCapacity() == 0){
            if(creep.transfer(currentStorage, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE){
                creep.moveTo(currentStorage);
            }
        }
        else if(currentContainer.store.getUsedCapacity != 0)
        {
          if(creep.withdraw(currentContainer, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE){
              creep.moveTo(currentContainer);
          }
        }
	}
};

module.exports = roleFetchMineral;
