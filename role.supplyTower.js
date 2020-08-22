var roleSupplyTower = {

    /** @param {Creep} creep **/
    run: function(creep) {
      var flags = currentRoom.find(FIND_FLAGS)
      var flagName = "";
     for (var i = 0; i < flags.length; i++) {
         if(flags[i].name.includes("market"))
             flagName = flags[i].name;
     }
     var backup = creep.room.find(FIND_STRUCTURES, {
             filter: (structure) => {
                 return (structure.structureType == STRUCTURE_STORAGE);
             }
     });
     var terminal = creep.room.find(FIND_STRUCTURES, {
             filter: (structure) => {
                 return (structure.structureType == STRUCTURE_TERMINAL);
             }
     });
     if(flagName != "")
     {
	    if(creep.store.getUsedCapacity() < creep.store.getCapacity()) {
          var sources = creep.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                      return (structure.structureType == STRUCTURE_CONTAINER);
                  }
          });
          //creep.say(sources[0].store.getUsedCapacity());
          if(sources[1].store.getUsedCapacity() > 150)
          {
            if(creep.withdraw(sources[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          }
          else {
            if(creep.withdraw(backup[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(backup[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER);
                    }
            });
		if(targets[0].store.getFreeCapacity() != 0)
		{
			if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
			}
		}
		else
		{
			if(creep.transfer(targets[targets.length - 1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(targets[targets.length - 1], {visualizePathStyle: {stroke: '#ffffff'}});
			}
		}
        }
        }
        else {
          if(creep.getUsedCapacity() != 0){
            if(creep.transfer(terminal[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      			    creep.moveTo(terminal[0], {visualizePathStyle: {stroke: '#ffffff'}});
      			}
          }
          else{
            if(creep.withdraw(backup[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      			    creep.moveTo(backup[0], {visualizePathStyle: {stroke: '#ffffff'}});
      			}
          }
        }
	}
};

module.exports = roleSupplyTower;
