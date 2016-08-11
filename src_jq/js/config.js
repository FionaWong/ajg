var p_domain = "";
var dev_domain ="";
var evn = "local";
var config ={};

var domain = evn=='dev'?dev_domain:p_domain;
domain = "http://10.28.122.11:8080";
var config ={
  //商品
  getGoodsList:domain+'/gbd-anybuy/manager/goods/getGoodsList',
  addGood:domain+'/gbd-anybuy/manager/goods/goodsmanage/addGood',
  update:domain+'/gbd-anybuy/manager/goods/update',
  getGoodDetail:domain+'/gbd-anybuy/manager/goods/getGoodDetail',
  shelf:domain+'/gbd-anybuy/manager/goods/shelf',
  queryAllParentProp:domain+'/gbd-anybuy/manager/goods/property/queryAllParentProp',
  queryChildPropByParentId:domain+'/gbd-anybuy/manager/goods/property/queryChildPropByParentId',
  queryAllMainTags:domain+'/gbd-anybuy/manager/goods/tag/main/queryAllMainTags',
  im_uploadpicture:domain+'/gbd-anybuy/consolemanage/im_uploadpicture',
  queryAllBrandInfo:domain+'/gbd-anybuy/manager/goods/brand/queryAllBrandInfo',

  //商品标签

  //供应商

  //订单
};
