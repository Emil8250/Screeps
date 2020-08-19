var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

            if(targets.length) {
              creep.say(creep.build(targets[0]));
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
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
		  if(sources[1].store.getUsedCapacity() > 150)
		  {
		    if(creep.withdraw(sources[1],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
		    }
		  }
		  else {
		    if(creep.withdraw(backup[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(backup[0], {visualizePathStyle: {stroke: '#ffaa00'}});
		    }
		  }
	    }
	}
};

module.exports = roleBuilder;
