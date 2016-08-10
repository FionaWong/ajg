var p_domain = "";
var dev_domain ="";
var evn = "dev";
var domain = evn=='dev'?dev_domain:p_domain;
var config ={
  //商品
  getGoodsList:domain+'gbp-anybuy/manager/goods/getGoodsList',
  addGood:domain+'/gbp-anybuy/manager/goods/goodsmanage/addGood',
  update:domain+'/gbp-anybuy/manager/goods/update',
  getGoodDetail:domain+'/gbp-anybuy/manager/goods/getGoodDetail',
  shelf:domain+'/gbp-anybuy/manager/goods/shelf',
  queryAllParentProp:domain+'/gbp-anybuy/manager/goods/property/queryAllParentProp',
  queryChildPropByParentId:domain+'/gbp-anybuy/manager/goods/property/queryChildPropByParentId',
  queryAllMainTags:domain+'/gbp-anybuy/manager/goods/tag/main/queryAllMainTags',
  im_uploadpicture:domain+'/gbp-anybuy/consolemanage/im_uploadpicture',
  queryAllBrandInfo:domain+'/gbp-anybuy/manager/goods/brand/queryAllBrandInfo',

  //商品标签

  //供应商
  
  //订单
};
