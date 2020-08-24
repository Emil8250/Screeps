
var roleEnergyMover = {

    /** @param {Creep} creep **/
    run: function(creep) {
      var source = _.max(creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE);
        }
      }), function(storage){return storage.store.getUsedCapacity(RESOURCE_ENERGY)});

      var container = _.max(creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER);
        }
      }), function(container){return container.store.getUsedCapacity(RESOURCE_ENERGY)});

      if(creep.memory.container == "")
        creep.memory.container = container.id;

      var currentContainer = Game.getObjectById(creep.memory.container);

      if(creep.store.getUsedCapacity() <= 0)
      {
        if(creep.withdraw(currentContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
          creep.moveTo(currentContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
      else
      {
        if(creep.transfer(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
          creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        else if(creep.transfer(source, RESOURCE_ENERGY) == OK)
          creep.memory.container = "";
      }
    }
}

module.exports = roleEnergyMover;
