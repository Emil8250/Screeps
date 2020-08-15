var buildRoadToController = {

    run: function() {
                var sources = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
            
                });
                var roadOpts = {ignoreCreeps: true};
                var roadPath = Game.spawns.Spawn1.room.findPath(sources[0].pos, Game.spawns.Spawn1.room.controller.pos, roadOpts); //creep.pos.findPathTo(creep.room.controller.pos);
            for (var i = 0; i < roadPath.length; i++) {
              //  roadPath[i].createConstructionSite(STRUCTURE_ROAD);
              Game.spawns.Spawn1.room.createConstructionSite(roadPath[i].x, roadPath[i].y, STRUCTURE_ROAD);
            }
        }
};
module.exports = buildRoadToController;