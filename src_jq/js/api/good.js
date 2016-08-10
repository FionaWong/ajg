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
