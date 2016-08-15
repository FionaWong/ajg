var supplier ={};
supplier.page=function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.listSupplier,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(){
		          alert("系统繁忙");
		        }
		    );
	    }
  	);
}
supplier.add=function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.addSupplier,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(){
		          alert("系统繁忙");
		        }
		    );
	    }
  	);
}
supplier.update=function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.updateSupplier,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(){
		          alert("系统繁忙");
		        }
		    );
	    }
  	);
}
supplier.view=function(data,successCb,errorCb){
	api.resultFun(
	    api.ajaxFun(config.viewSupplier,data),
		function(res){
		    api.resultCode(res)(
		        res,
		        //code :E000 正常回调
		        successCb,
		        //code :非E000 回调
		        errorCb || function(){
		          alert("系统繁忙");
		        }
		    );
	    }
  	);
}
