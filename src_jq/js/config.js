var env = "local";
var p_domain = "";//product 生产地址
var dev_domain ="";//dev 生产地址
var domain_good = "";
var domain_supplier ="";
var domain_order ="";
var domian_label ="";
var domian_brand ="";


var config ={};
if(env== 'local'){
   domain_good = "http://10.28.124.7:8080";
   domain_supplier = "http://10.28.124.7:8080"//"http://10.28.122.11:8080";//"http://10.28.152.33:8080";//"http://114.141.178.31";//
   domain_order = "http://10.28.124.7:8080";//"http://jkqsh-l0771:8080";//"http://10.28.122.11:8080";
   domain_label = "http://10.28.124.7:8080";
   //domian_brand ="http://10.28.124.7:8080";
   domian_brand ="http://10.28.124.7:8080";
}
if(env == 'dev'){
    domain_good = dev_domain;
    domain_supplier = dev_domain;
    domain_order = dev_domain;
    domain_label = dev_domain;
    domian_brand = dev_domain;
}
if(env == 'prd'){
  domain_good = p_domain;
  domain_supplier = p_domain;
  domain_order = p_domain;
  domain_label = p_domain;
    domian_brand = p_domain;

}



var config ={
  //登陆
  login : domain_good+"/gbd-anybuy/consolemanage/login",
  //商品
    //列表
  getGoodsList:domain_good+'/gbd-anybuy/manager/goods/getGoodsList',
    //添加商品
  addGood:domain_good+'/gbd-anybuy/manager/goods/addGood',
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
  //图片上传更新
  update_picture:domain_good+'/gbd-anybuy/consolemanage/update_picture',
  // 删除图片
  del_picture: domain_good+'/gbd-anybuy/consolemanage/del_picture',
    //品牌列表
  queryAllBrandInfo:domain_good+'/gbd-anybuy/manager/goods/brand/queryAllBrandInfo',

  //商品标签
    //商品主标签查询
  mainList:domain_label+'/gbd-anybuy/manager/goods/tag/main/list',
    //商品主标签添加
  mainCreate:domain_label+'/gbd-anybuy/manager/goods/tag/main/create',
    //商品主标签修改
  mainUpdate:domain_label+'/gbd-anybuy/manager/goods/tag/main/update',
    //商品主标签详情
  mainDetail:domain_label+'/gbd-anybuy/manager/goods/tag/main/detail',
    //商品限时限量标签查询列表
  limitList:domain_label+'/gbd-anybuy/manager/limitTag/list',
    //商品限时限量标签新增
  limitInsert:domain_label+'/gbd-anybuy/manager/limitTag/insert',
     //商品限时限量标签修改
  limitUpdate:domain_label+'/gbd-anybuy/manager/limitTag/update',
    //商品限时限量标签详情
  limitDetail:domain_label+'/gbd-anybuy/manager/limitTag/getDetail',

  //品牌
    //商品品牌标签查询列表
  getGoodBrandList:domian_brand+'/gbd-anybuy/manager/goods/brand/getGoodBrandList',
    //新增品牌标签
  insertBrand:domian_brand+'/gbd-anybuy/manager/goods/brand/insert',
    //修改品牌标签
  updateBrand:domian_brand+'/gbd-anybuy/manager/goods/brand/update',
    //删除品牌标签
  removeBrand:domian_brand+'/gbd-anybuy/manager/goods/brand/remove',
  //品牌详情
  detailBrand:domian_brand+'/gbd-anybuy/manager/goods/brand/detail',
    //添加品牌图片
  addImage:domian_brand+'/gbd-anybuy/manager/goods/brand/addImage',
  //修改品牌图片
  updateImage:domian_brand+'/gbd-anybuy/manager/goods/brand/updateImage',
  //添加品牌图片
  removeImage:domian_brand+'/gbd-anybuy/manager/goods/brand/removeImg',
    //


  //供应商
    //添加供应商
  addSupplier: domain_supplier+'/gbd-anybuy/manager/merchant/add',
    //编辑供应商
  updateSupplier: domain_supplier+'/gbd-anybuy/manager/merchant/update',
    //供应商详情
  viewSupplier: domain_supplier+'/gbd-anybuy/manager/merchant/view',
    //供应商分页列表
  listSupplier: domain_supplier+'/gbd-anybuy/manager/merchant/page',

  //订单
    //订单列表
  orderList:domain_order+"/gbd-anybuy/manager/order/list",
    //更新订单物流信息接口
  orderModifyLogistics:domain_order+"/gbd-anybuy/manager/order/modifyLogistics",
    //分页查询订单接口
  orderDetail:domain_order+"/gbd-anybuy/manager/order/detail",


  //属性
  //分页查询属性
  propertylist:domain_good+"/gbd-anybuy/manager/goods/property/page",
  //添加属性
  addProperty:domain_good+"/gbd-anybuy/manager/goods/property/addProperty",
  //修改属性
  updateProperty:domain_good+"/gbd-anybuy/manager/goods/property/updateProperty",
  //删除属性
  shelfProperty:domain_good+"/gbd-anybuy/manager/goods/property/remove",
  


};
