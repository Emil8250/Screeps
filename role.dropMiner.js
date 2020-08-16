var roleDropminer = {

    /** @param {Creep} creep **/
    run: function(creep) {
            var sources = creep.room.find(FIND_SOURCES);
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
            });
            var containerKeys = Object.keys(creep.room.creeps);
            for (var i = 0; i < containerKeys.length; i++) {
              var currentCreep = creep.room.creeps[containerKeys[i]];
              console.log(currentCreep.id);
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
