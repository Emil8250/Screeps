var roleRoadSquad = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
        });
        var lowContainer = _.min(targets, function(container) { return container.hits; });   
        if(!creep.memory.container){
            creep.memory.container = lowContainer.id;
        }
        else{
           /* var currentRoad = targets.filter(road => {
                return road.id === creep.memory.road;
            })*/
            var currentContainer = Game.getObjectById(creep.memory.container);
            if(currentContainer === null)
                currentContainer = "";
                
            if(currentContainer.hits == currentContainer.hitsMax)
            {
                creep.say('Full HP');
                creep.memory.container = ""
            }
            if(lowContainer.hits < 15000 && currentContainer > 25000)
            {
                creep.memory.container = lowContainer.id;
                currentContainer = lowContainer;
            }
            if(creep.store.getUsedCapacity() <= 0)
            {
                 if(creep.withdraw(currentContainer, RESOURCE_ENERGY) == -9) {
                    creep.moveTo(currentContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else
            {
                if(creep.repair(currentContainer) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(currentContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }            
            
        }
        
    }
}
module.exports = roleRoadSquad;