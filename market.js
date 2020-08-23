var market = {

    run: function() {
      var test = Game.market.getAllOrders();
      var orders = _.filter(test, function(order) {return order.resourceType == PIXEL && order.type == ORDER_BUY});
      var maxOrder =  _.max(orders, function(order){return order.price});
      console.log('best price & fee: ' + _.max(orders, function(order){return order.price}).price);
      console.log(maxOrder.id);
      console.log(maxOrder.amount);
      if(maxOrder.price > 745){
        console.log(Game.resources['PIXEL']);
      }
    }
};
module.exports = market;
