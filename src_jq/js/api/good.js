//商品管理模块
var good={};
//所有商品列表
good.getGoodsList = function(){
    resultFun(ajaxFun(url,data),function(res){
      resultCode()(res,function(){//callback

      });
    });

};
//添加商品
good.addGood= function(url,data){

};
//修改商品
good.update= function(url,data){

};
//商品详情
good.getGoodDetail= function(url,data){

};
//商品上下架
good.shelf = function(){

};

good.queryAllParentProp= function(cb){
  api.resultFun(
    api.ajaxFun(config.queryAllParentProp,{}),
    function(res){
      if(res.code && res.code=='E000'){
        var list = res.data.list;
        cb(list);
        // for(var x in list){
        //   good.queryChildPropByParentId(list[x]['propertyParentId'],cb);
        // }
      } else{
        alert("系统繁忙");
      }
    }
  );
};

good.queryChildPropByParentId = function(parentId,cb){
  api.ajaxFun(config.queryChildPropByParentId,parentId),
    function(res){
    if(res.code && res.code=='E000'){
      cb.call(this,res);
      
    } else{
      alert("系统繁忙");
    }
  }
};

//拿到所有标签信息
good.queryAllMainTags = function(cb){
	api.resultFun(
	    api.ajaxFun(config.queryAllMainTags,{}),
	    function(res){
	      if(res.code && res.code=='E000'){
	        var list = res.data.list;
	        cb(list);
	        
	      } else{
	        alert("系统繁忙");
	      }
	    }
  );
};