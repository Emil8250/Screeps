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
              if(dropMiners[i].memory.container != ""){
                takenContainers.push(dropMiners[i].memory.container);
                console.log(dropMiners[i].memory.container);
              }
              else {
                dropMiners[i].memory.container = targets[0].id;
                dropMiners[i].memory.currentSource = sources[0].id
              }
            }
          /*  console.log(targets[1]);
                if(!takenContainers.includes(targets[0].id)){
                  creep.memory.container = targets[0].id;
                  creep.memory.source = sources[0].id;
                }
                else if(!takenContainers.includes(targets[1].id)){
                  creep.memory.container = targets[1].id;
                  creep.memory.source = sources[1].id;
                }*/
            var currentSource = Game.getObjectById(creep.memory.currentSource);
            var currentTarget = Game.getObjectById(creep.memory.container);

            if(creep.harvest(currentSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(currentTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	}
};

module.exports = roleDropminer;
