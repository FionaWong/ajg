//商品管理模块
var good={};
//所有商品列表
good.getGoodsList = function(url,data){
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
        cb.call(this,list);
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
