var order ={};

//订单列表
order.orderList = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.orderList,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
  	);
}
//物流信息
order.orderModifyLogistics = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.orderModifyLogistics,data),
	    function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
 	 );
}
//订单详情
order.orderDetail = function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.orderDetail,data),
	    function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(res){
		          alert(res.message);
		        }
		    );
	    }
 	);
}