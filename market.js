var market = {

    run: function() {
      if(Memory.nextMarketCheck < Game.time)
      {
          var test = Game.market.getAllOrders();
          var orders = _.filter(test, function(order) {return order.resourceType == PIXEL && order.type == ORDER_BUY});
          var maxOrder =  _.max(orders, function(order){return order.price});
          console.log('best price & fee: ' + _.max(orders, function(order){return order.price}).price);
          console.log(maxOrder.id);
          console.log(maxOrder.amount);
          var pixels = Game.resources['pixel'];
          if(maxOrder.price > 739 && pixels > 0){
            if(maxOrder.amount > pixels){
                Game.market.deal(maxOrder.id, pixels);
            }
            else{
                Game.market.deal(maxOrder.id, maxOrder.amount);
            }
          }
          if(maxOrder.amount > pixels)
            Memory.nextMarketCheck = Game.time + 1200;
      }
    }
};
module.exports = market;
