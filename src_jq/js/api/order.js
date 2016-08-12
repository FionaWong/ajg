var order ={};
//订单列表
order.orderList = function(data,cb){
	api.resultFun(
	    api.ajaxFun(config.orderList,data),
	    function(res){
	      if(res.code && res.code=='E000'){
	        var list = res.data.list;
	        cb(list);
	        
	      } else{
	        alert("系统繁忙");
	      }
	    }
  );
}
//物流信息
order.orderModifyLogistics = function(data,cb){
	api.resultFun(
	    api.ajaxFun(config.orderModifyLogistics,data),
	    function(res){
	      if(res.code && res.code=='E000'){
	        
	        cb(res);
	        
	      } else{
	        alert("系统繁忙");
	      }
	    }
 	 );
}
//订单详情
order.orderDetail = function(data,cb){
	api.resultFun(
	    api.ajaxFun(config.orderDetail,data),
	    function(res){
	      if(res.code && res.code=='E000'){
	        
	        cb(res);
	        
	      } else{
	        alert("系统繁忙");
	      }
	    }
 	 );
}