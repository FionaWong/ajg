import{
  ADVERTS_MENU,GOODS_MENU,LABELS_MENU,ORDERS_MENU,SUPPLIERS_MENU
} from ../actionTypes

const defaultState ={
  test:''
}

export default function menus(state = defaultState,action){

    return Object.assign({},state,{
      filter:state.filter
    })



}
