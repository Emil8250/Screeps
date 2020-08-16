var roleDropminer = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
            });
            var dropMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'dropMiner');
            var takenContainers = [];
            for (var i = 0; i < dropMiners.length; i++) {
              takenContainers.push(dropMiners[i].memory.container);
              console.log(dropMiners[i].memory.container);
            }
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            if(targets.length > 0 && targets[0].energy < targets[0].energyCapacity) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	}
};

module.exports = roleDropminer;
