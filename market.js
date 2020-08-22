var market = {

    run: function() {
      var test = Game.market.getAllOrders();
      var orders = _.filter(test, function(order) {return order.resourceType == PIXEL && order.type == ORDER_BUY});
      console.log('best price & fee: ' + _.max(orders, function(order){return order.price}).price);
      var roomName = _.max(orders, function(order){return order.price});
      console.log(roomName);
      var fee = Game.market.calcTransactionCost(1, roomName.roomName, 'W25N3');
      console.log(fee);
    }
};
module.exports = market;
