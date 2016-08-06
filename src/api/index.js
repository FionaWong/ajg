import request from 'reqwest'
import dataAPI from 'dataAPI'

const domain = process.env.DEV_ENV === 'production'
	? 'http://www.pingan.com'
	: '';

//判断选择ajax拿数据还是造数据
function getDateSource(prductAction,devAction){
  process.env.DEV_ENV === 'production'
  ? return prductAction
  : return devAction
  ;
}


const urls ={
  'getGoodsList':domain+'/gbp-anybuy/goodsmanage/getGoodsList',
  'addGood':domain+'/gbp-anybuy/goodsmanage/addGood',
  'update':domain+'/gbp-anybuy/goodsmanage/update',
  'getGoodDetail':domain+'/gbp-anybuy/goodsmanage/getGoodDetail',
  'shelf':domain+'/gbp-anybuy/goodsmanage/shelf'
};
const timeout =10000;

exports function getGoodList(params){
  let defaultParam ={
    goodId:'',
    goodName:'',
    status:0,
    onlineTimeBegin:'',
    onlineTimeEnd:''
  };

  return getDateSource(
    request({
      url: urls.getGoodsList,
      method: 'GET',
      type: 'jsonp',
      timeout: timeout,
      contentType: 'application/json;charset=utf-8',
      data: Object.assign({},defaultParam,Array.prototype.slice(arguments))
    }),
    dataAPI.getGoodsList()
  );
}


exports function addGood(){
  let defaultParam ={
    limitNumber : 0,//限购数量 选填
    mainTags:'',  //主标签  选填
    //属性标签没有
    brandId:'',    //品牌 选填
    beginSellDate:'',
    endSellDate:'',
    goodId: '',
    goodName:'',
    goodTitle:'',
    marketPrice:'',
    lowestPrice:'',
    remainNum:'',//库存数量
    merchantId:'',//供应商Id
    goodDescription:'',
    status:0
  };
  return getDateSource(
    request({
      url: urls.addGood,
      method: 'GET',
      type: 'jsonp',
      timeout: timeout,
      contentType: 'application/json;charset=utf-8',
      data: Object.assign({},defaultParam,Array.prototype.slice(arguments))
    }),
    dataAPI.addGood()
  );
}

exports function update(){
  let defaultParam ={
    limitNumber : 0,//限购数量 选填
    mainTags:'',  //主标签  选填
    //属性标签没有
    brandId:'',    //品牌 选填
    beginSellDate:'',
    endSellDate:'',
    goodId: '',
    goodName:'',
    goodTitle:'',
    marketPrice:'',
    lowestPrice:'',
    remainNum:'',//库存数量
    merchantId:'',//供应商Id
    goodDescription:'',
    status:0
  };
  return getDateSource(
    request({
      url: urls.update,
      method: 'GET',
      type: 'jsonp',
      timeout: timeout,
      contentType: 'application/json;charset=utf-8',
      data: Object.assign({},defaultParam,Array.prototype.slice(arguments))
    }),
    dataAPI.update()
  );
}

exports function getGoodDetail(goodId){
  return getDateSource(
    request({
      url: urls.getGoodDetail,
      method: 'GET',
      type: 'jsonp',
      timeout: timeout,
      contentType: 'application/json;charset=utf-8',
      data: {goodId:goodId}
    }),
    dataAPI.getGoodDetail(goodId)
  );
}


exports function shelf(goodId,status){
  return getDateSource(
    request({
      url: urls.shelf,
      method: 'GET',
      type: 'jsonp',
      timeout: timeout,
      contentType: 'application/json;charset=utf-8',
      data: {goodId:goodId,status:status}
    }),
    dataAPI.shelf(goodId,status)
  );
}
