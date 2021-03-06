
var roleUpgrader2 = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
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
          /*if(sources[0].store.getUsedCapacity() > 150)
          {
            if(creep.withdraw(sources[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          }
          else {*/
            if(creep.withdraw(backup[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(backup[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          //}
        }
    }
}

module.exports = roleUpgrader2;
