var env = "local";
var p_domain = "";//product 生产地址
var dev_domain ="";//dev 生产地址
var domain_good = "";
var domain_supplier ="";
var domain_order ="";

var config ={};
if(env== 'local'){
   domain_good = "http://10.28.122.11:8080";
   domain_supplier ="http://10.28.122.11:8080";
   domain_order ="http://jkqsh-l0771:8080";
}
if(env == 'dev'){
    domain_good = dev_domain;
    domain_supplier = dev_domain;
    domain_order = dev_domain;
}
if(env == 'prd'){
  domain_good = p_domain;
  domain_supplier = p_domain;
  domain_order = p_domain;
}



var config ={
  //登陆
  login : domain_good+"/gbd-anybuy/consolemanage/login",
  //商品
    //列表
  getGoodsList:domain_good+'/gbd-anybuy/manager/goods/getGoodsList',
    //添加商品
  addGood:domain_good+'/gbd-anybuy/manager/goods/goodsmanage/addGood',
    //修改商品
  update:domain_good+'/gbd-anybuy/manager/goods/update',
    //商品详情
  getGoodDetail:domain_good+'/gbd-anybuy/manager/goods/getGoodDetail',
    //上下架功能
  shelf:domain_good+'/gbd-anybuy/manager/goods/shelf',
    //主属性信息
  queryAllParentProp:domain_good+'/gbd-anybuy/manager/goods/property/queryAllParentProp',
    //子属性
  queryChildPropByParentId:domain_good+'/gbd-anybuy/manager/goods/property/queryChildPropByParentId',
    //主标签
  queryAllMainTags:domain_good+'/gbd-anybuy/manager/goods/tag/main/queryAllMainTags',
    //图片上传
  im_uploadpicture:domain_good+'/gbd-anybuy/consolemanage/im_uploadpicture',
    //品牌列表
  queryAllBrandInfo:domain_good+'/gbd-anybuy/manager/goods/brand/queryAllBrandInfo',

  //商品标签

  //供应商
    //添加供应商
  addSupplier: domain_supplier+'/gbp-anybuy/manager/merchant/add',
    //编辑供应商
  updateSupplier: domain_supplier+'/gbp-anybuy/manager/merchant/update',
    //供应商详情
  viewSupplier: domain_supplier+'/gbp-anybuy/manager/merchant/view',
    //供应商分页列表
  listSupplier: domain_supplier+'/gbp-anybuy/manager/merchant/page',

  //订单
    //订单列表
  orderList:domain_order+"/gbd-anybuy/manager/order/list",
    //更新订单物流信息接口
  orderModifyLogistics:domain_order+"/gbd-anybuy/manager/order/list",
    //分页查询订单接口
  orderDetail:domain_order+"/gbd-anybuy/manager/order/detail"
};
