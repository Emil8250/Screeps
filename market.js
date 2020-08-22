var market = {

    run: function() {
      var test = Game.market.getAllOrders();
      var orders = _.filter(test, function(order) {return order.resourceType == RESOURCE_PIXEL && order.type == ORDER_BUY});
      console.log('best price & fee: ' + _.max(orders, function(order){return order.price}).price);
      var roomName = _.max(orders, function(order){return order.price}).roomName;
      var fee = Game.market.calcTransactionCost(1, roomName, Game.spawns.Spawn1.room);
      console.log(fee);
    }
};
module.exports = market;
