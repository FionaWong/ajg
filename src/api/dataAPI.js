
let goods =[];
let good = {
  limitNumber : 0,
  mainTags:'',
  brandId:'',
  beginSellDate:'',
  endSellDate:'',
  goodId:'',
  goodName:'',
  goodTitle:'',
  marketPrice:'',
  lowestPrice:'',
  status:0
};


//商品列表
export function getGoodList(params){
  // goodId
  // goodName
  // status
  // onlineTimeBegin
  // onlineTimeEnd
  //   pageSize
  // pageNum
  return {
    data:{
      count:10,
      list : goods,
      condition:{}
    },
    message:'',
    code:''
  };
}
//添加商品
export function addGood(params){

  let good = {
    limitNumber : params.limitNumber,//限购数量 选填
    mainTags:params.mainTags,  //主标签  选填
    //属性标签没有
    brandId:params.brandId,    //品牌 选填
    beginSellDate:params.beginSellDate,
    endSellDate:params.endSellDate,
    goodId: 'good_'+parseInt(Math.random() *100000),
    goodName:params.goodName,
    goodTitle:params.goodTitle,
    marketPrice:params.marketPrice,
    lowestPrice:params.lowestPrice,
    remainNum:params.remainNum,//库存数量
    merchantId:params.merchantId,//供应商Id
    goodDescription:params.goodDescription,
    status:0
  };
  let response ={
    data:{
    },
    message:'success',
    code:'000000'
  };
  for (var x in good){
    if(x!= 'limitNumber' && x!= 'mainTags' && x!= 'brandId' && good[x]){
      response ={
        data:{
        },
        message:'商品名等不能为空',
        code:'error'
      };
    }else{
      goods.push(good);
    }
  }
  return response;
}
//修改商品
export function update(params){

  let good = Object.assign({},good,Array.prototype.slice.call(arguments));
  let response ={
    data:{
    },
    message:'success',
    code:'000000'
  };
  for(var x in good){
    if(x=='goodId' || x=='goodName' ||  x =='goodTitle' && good[x]){
      return response;
    }else{
      return {
        data:{
        },
        message:'attributes not full',
        code:'error'
      };
    }
  }
}
//商品详情
export function getGoodDetail(goodId){
  let good = {};
  for(var x in goods){
    if(x.goodId == goodId){
      good = goods[x];
      break;
    }
  }
  return {
    data:good,
    message:'get it',
    code:'sucesss'
  };
}
//商品上下架
export function shelf(goodId,status=0){
  for(var x in goods){
    if(x.goodId == goodId){
      goods[x].status = status ;
      break;
    }
  }
  return  {
    data:{},
    message:'get it',
    code:'200'
  };
}
