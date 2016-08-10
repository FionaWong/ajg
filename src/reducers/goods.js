import {
  GET_GOODS_BEGIN,
  GET_GOODS_FAIL,
  GET_GOODS_SUCCESS,
  RESET_GOODS,
  
}
from '../actions'

const defaultState ={
  isBegin : false,
  error : false,
  list:[],
  currentPage:0
}

export default function goods(state=defaultState,action){
  switch (action.type) {
    case GET_GOODS_BEGIN:
      return Object.assign({},state,{
        isBegin:true
      })

    case GET_GOODS_FAIL:
      return Object.assign({},target,{
        isBegin:false,
        error:true
      })

    case GET_GOODS_SUCCESS:
      return Object.assign({},state,{
        isBegin:false,
        error:false,
        list : action.data.list,
        currentPage: action.conditions.pageNum
      })

    case RESET_GOODS:

      return defaultState
    default:
    return state;
  }
}
