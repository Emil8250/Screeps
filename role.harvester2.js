var roleHarvester2 = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.store.getUsedCapacity() < 50) {
          var sources = creep.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_CONTAINER);
                  }
          });
          var backup = creep.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_STORAGE);
                  }
          });
          //creep.say(sources[0].store.getUsedCapacity());
        /*  if(sources[1].store.getUsedCapacity() > 150)
          {
            if(creep.withdraw(sources[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          }
          else {*/
            if(creep.withdraw(backup[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(backup[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          //}
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
        }
	}
};

module.exports = roleHarvester2;
