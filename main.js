var roleHarvester = require('role.harvester');
var roleRepair = require('role.repair');
var roleHarvester2 = require('role.harvester2');
var roleUpgrader = require('role.upgrader');
var roleUpgrader2 = require('role.upgrader2');
var roleBuilder = require('role.builder');
var roleDropMiner = require('role.dropMiner');
var roleUpgraderRoadBuilder = require('role.upgraderRoadBuilder');
var buildRoadToController = require('build.roadToController');
var roleRoadSquad = require('role.roadSquad');
var roleSupplyTower = require('role.supplyTower');
var roleHauler = require('role.hauler');
var roleRampartRepair = require('role.rampartRepair');

module.exports.loop = function () {
    //var containerFlag = Game.spawns.Spawn1.room.find(FIND_FLAGS)[1].pos
   // Game.spawns.Spawn1.room.createConstructionSite(containerFlag.x, containerFlag.y, STRUCTURE_CONTAINER);
  //  Game.spawns.Spawn1.room.createConstructionSite(containerFlag.x + 1, containerFlag.y, STRUCTURE_CONTAINER);
  //  Game.spawns.Spawn1.room.createConstructionSite(containerFlag.x, containerFlag.y + 1, STRUCTURE_CONTAINER);
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var gameSpawns = Object.keys(Game.spawns);

    for (var i = 0; i < gameSpawns.length; i++) {
       var currentSpawn = Game.spawns[gameSpawns[i]];
       var currentRoom = currentSpawn.room;
               var hostiles = currentRoom.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        var username = hostiles[0].owner.username;
        Game.notify("User ${username} spotted in room ${Game.spawns.Spawn1.room.name}");
        var towers = currentRoom.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }
    //
     var flags = currentRoom.find(FIND_FLAGS)
    for (var i = 0; i < flags.length; i++) {
        if(flags[i].name == 'road')
            buildRoadToController.run();
    }
    var ramparts = currentRoom.find(
        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_RAMPART}});
    var rampartSum = 0;
    ramparts.forEach(rampart => rampartSum += rampart.hits);        
    //var containerFlag = Game.spawns.Spawn1.room.find(FIND_FLAGS)[1].pos
    var sites = false;
    console.log("ConstructionSites: ");
    if(currentRoom.find(FIND_CONSTRUCTION_SITES) == "")
    {
        var extensions = currentRoom.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION)}}).length;
        var allFlags = currentRoom.find(FIND_FLAGS);
        if(allFlags.length != 0){

        var flagPos = currentRoom.find(FIND_FLAGS)[0].pos

        for (var i = 0; i < 20; i++) {
            if(i % 4 == 0)
                currentRoom.createConstructionSite(flagPos.x, flagPos.y + i, STRUCTURE_EXTENSION);
            if(i % 4 == 1)
                currentRoom.createConstructionSite(flagPos.x - i, flagPos.y + i, STRUCTURE_EXTENSION);
            if(i% 4 == 2)
                currentRoom.createConstructionSite(flagPos.x - i, flagPos.y - i, STRUCTURE_EXTENSION);
            if(i% 4 == 3)
                currentRoom.createConstructionSite(flagPos.x + i, flagPos.y + i, STRUCTURE_EXTENSION);
        }
        }

    }
    else
    {
        sites = true;
    }
    console.log(sites);
    var harvesters2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    console.log('Harvesters: ' + harvesters2.length);
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    var upgraders2 = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader2');
    console.log('Upgraders2: ' + upgraders2.length);
    var roadUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'roadBuilder');
    console.log('RoadUpgraders: ' + roadUpgraders.length);
    var dropMiner =_.filter(Game.creeps, (creep) => creep.memory.role == 'dropMiner');
    console.log('drop: ' + dropMiner.length);
    var conRepair = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    console.log('repairs: ' + conRepair.length);
    var roadSquad = _.filter(Game.creeps, (creep) => creep.memory.role == 'roadSquad');
    console.log('roadSquad: ' + roadSquad.length);
    var supplyTower = _.filter(Game.creeps, (creep) => creep.memory.role == 'supplyTower');
    console.log('supplyTower: ' + supplyTower.length);
    var hauler =  _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    console.log('Hauler: ' + hauler.length);
    var rampartRepair = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairRampart');
    console.log('Ramparts: ' + rampartRepair.length);

    var spawnHarvester = false;
    var spawnOldHarvester = false;
    var spawnMiner = false;
    var spawnSupplyTower = false;
    var towers = currentRoom.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_TOWER);
            }
    });
    if(supplyTower.length < 1 && towers.length > 0){
        if(towers[0].energyAvailable != towers[0].energyCapacity)
            spawnSupplyTower = true;
    }
    if(harvesters2.length < 2)
        spawnHarvester = true;
    if(dropMiner.length == 2){
       if(dropMiner[0].ticksToLive < 10 || dropMiner[1].ticksToLive < 10 ){
           spawnMiner = true;
       }
    }
    if(dropMiner.length < 2)
        spawnMiner = true;

    if(Object.keys(Game.creeps).length == 0)
        spawnOldHarvester = true;

        if (spawnOldHarvester)
        {
            var newName = 'harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            currentSpawn.spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                {memory: {
                    role: 'harvester',
                }});
        }
        else if(spawnMiner) {
        var newName = 'dropMiner' + Game.time;
        console.log('Spawning new miner: ' + newName);
        currentSpawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE], newName,
            {memory: {
                role: 'dropMiner',
                container: '',
                currentSource: ''
            }});
    }
    else if(spawnHarvester) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        currentSpawn.spawnCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester2'}});
    }

    else if(conRepair.length < 1)
    {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repair: ' + newName);
        currentSpawn.spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'repair'}});
    }
           else if(upgraders2.length < 1) {
        var newName = 'Upgrader2' + Game.time;
        console.log('Spawning new upgrader2: ' + newName);
        currentSpawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'upgrader2'}});
    }
    else if(builders.length < 1 && sites) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        currentSpawn.spawnCreep([WORK,CARRY,CARRY,CARRY,WORK,MOVE], newName,
            {memory: {role: 'builder'}});
    }
    else if(roadSquad.length < 1)
    {
                var newName = 'roadSquad' + Game.time;
        console.log('Spawning new roadSquad: ' + newName);
        currentSpawn.spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'roadSquad'}});
    }
    else if (hauler.length < 1)
    {
        var newName = 'hauler' + Game.time;
        console.log('Spawning new hauler: ' + newName);
        currentSpawn.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'hauler'}});
    }
    else if(rampartRepair.length < 1){
      var newName = 'repairRampart' + Game.time;
      console.log('Spawning new repairRampart: ' + newName);
      currentSpawn.spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
          {memory: {
              role: 'repairRampart',
              currentRampart: 0, 
              rampart: ''
          }});
    }
    else if(spawnSupplyTower) {
        var newName = 'SupplyTower' + Game.time;
        console.log('Spawning new SupplyTower: ' + newName);
        currentSpawn.spawnCreep([WORK,CARRY,CARRY,WORK,MOVE,MOVE], newName,
            {memory: {role: 'supplyTower'}});
    }
    else if(currentRoom.energyAvailable >= 900 && upgraders2.length < 11) {
        var newName = 'Upgrader2' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        currentSpawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'upgrader2'}});
    }
   /* else if(Game.spawns.Spawn1.energy >= 200) {
                var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }*/

    if(currentSpawn.spawning) {
        var spawningCreep = Game.creeps[currentSpawn.spawning.name];
        currentRoom.visual.text(
            '🛠️' + spawningCreep.memory.role,
            currentSpawn.pos.x + 1,
            currentSpawn.pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role) {
          case 'harvester':
            roleHarvester.run(creep);
            break;
          case 'upgrader':
            roleUpgrader.run(creep);
            break;
          case 'upgrader2':
            roleUpgrader2.run(creep);
            break;
          case 'builder':
            roleBuilder.run(creep);
            break;
          case 'roadBuilder':
              roleUpgraderRoadBuilder.run(creep);
              break;
          case 'dropMiner':
              roleDropMiner.run(creep, currentRoom);
              break;
          case 'harvester2':
              roleHarvester2.run(creep);
              break;
          case 'repair':
              roleRepair.run(creep);
              break;
          case 'roadSquad':
              roleRoadSquad.run(creep);
              break;
          case 'supplyTower':
              roleSupplyTower.run(creep);
              break;
          case 'hauler':
            roleHauler.run(creep);
            break;
          case 'repairRampart':
            roleRampartRepair.run(creep);
            break;
          default:
            console.log('creep role: ' + creep.memory.role);
            break;

        }
    }
        Memory.stats = {
        ControllerProgress: Game.spawns.Spawn1.room.controller.progress,
        UsedCpu: Game.cpu.getUsed(),
        RCL: Game.spawns.Spawn1.room.controller.level,
        RCLCurrent: Game.spawns.Spawn1.room.controller.progress,
        RCLNext: Game.spawns.Spawn1.room.controller.progressTotal,
        GCL: Game.gcl.level,
        GCLCurrent: Game.gcl.progress,
        GCLNext: Game.gcl.progressTotal,
        Harversters: harvesters2.length,
        Miners: dropMiner.length,
        Upgraders: upgraders2.length,
        roadSquad: roadSquad.length,
        rampartSum: rampartSum,
    };
    }
}
