var roleUpgraderRoadBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.roadBuilding)
        {
          var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else{
                creep.memory.roadBuilding = true;
            }
        }
        else{
            var roadPath = creep.pos.findPathTo(creep.room.controller.pos);
           /* for (var i = 0; i < roadPath.length; i++) {
                roadPath[i].createConstructionSite(STRUCTURE_ROAD);
            }*/
            roadPath
        }
    }
};
module.exports = roleUpgraderRoadBuilder;