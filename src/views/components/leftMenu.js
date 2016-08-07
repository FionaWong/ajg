import React from 'react'
//import menu from '../../api/menu'

const  menu = [
    {
      id:'ADVERTS_MENU',
      href:'adverts',
      name:'广告位管理'
    },
    {
      id:'GOODS_MENU',
      href:'goods',
      name:'商品管理'

    },
    {
      id:'LABELS_MENU',
      href:'labels',
      name:'商品标签管理'
    },
    {
      id:'ORDERS_MENU',
      href:'orders',
      name:'订单管理'
    },
    {
      id:'SUPPLIERS_MENU',
      href:'suppliers',
      name:'供应商管理'
    }
];
class LeftMenu extends React.Component{
  constructor(props, context) {
    super(props, context)
    this.state = { filter: 'GOODS_MENU'}
  }
  statesHover(x){
    if(this.state.filter == x){
      return 'active';
    }else{
      return '';
    }
  }
  handleClick(x){
    this.setState( { filter: x});
  }

   render(){
     return (
       <div className="sidebar">
           <ul>
           {
             menu.map((x,i)=>{
               <li key={x.id}><a href={x.href} className={this.statesHover(x.id)} onClick={this.handleClick(x.id)}>{x.name}</a></li>
             })
           }
           </ul>
       </div>
     )
   }
}
export default LeftMenu
