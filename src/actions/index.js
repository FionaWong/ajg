import * as types from '../constants/actionTypes';
import * as api from '../api/dataAPI';
import responseAdapter from '../utils/response'

//account login
function accountUnlogin(errorCode,errorMsg){
  return {
    type : types.ACCOUNT_UNLOGIN,
    errorCode : errorCode,
    errorMsg : errorMsg
  }
}

//GOODS
function getGoodsBegin(){
  return {
    type:types.GET_GOODS_BEGIN
  }
}
function getGoodsSuccess(result){
  return {
    type:types.GET_GOODS_SUCCESS,
    result:result
  }
}
function getGoodsFail(errorCode,errorMsg){
  return {
    type:types.GET_GOODS_FAIL,
    errorCode : errorCode,
    errorMsg : errorMsg
  }
}
export function getGoodsReset(param){

}
export function getGoods(param){
  return function(dispatch,getState){
    dispatch(getGoodsBegin());
    return api.getGoodList(param)
    .then(res => {
      res.code,{
        success : dispatch.bind(this,getGoodsSuccess(res.data)),
        fail : dispatch.bind(this,getGoodsFail(res.code,res.message)),
        unlogin : dispatch.bind(this,accountUnlogin(res.code,res.message))
      }
    })
    .fail( () => dispatch(getGoodsFail('888888','网络繁忙，请稍后再试。')));
  }
}
