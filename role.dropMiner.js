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
              if(dropMiners[i].memory.container2 != "" && dropMiners[i].memory.source != ""){
                takenContainers.push(dropMiners[i].memory.container2);
              }
              else {
              /*  dropMiners[i].memory.container2 = targets[0].id;
                dropMiners[i].memory.source = sources[0].id;*/
              }
            }
if(creep.memory.container2 == "" || !creep.memory.container2 )
{
                if(!takenContainers.includes(targets[0].id)){
                  creep.memory.container2 = targets[0].id;
                  creep.memory.source = sources[0].id;
                }
                else if(!takenContainers.includes(targets[1].id)){
                  creep.memory.container2 = targets[1].id;
                  creep.memory.source = sources[1].id;
                }
}
            var currentSource = Game.getObjectById(creep.memory.source);
            var currentTarget = Game.getObjectById(creep.memory.container2);
creep.say(creep.harvest(currentSource));
            if(creep.harvest(currentSource) == ERR_NOT_IN_RANGE || creep.pos != currentTarget.pos) {
                creep.moveTo(currentTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	}
};

module.exports = roleDropminer;
