import React from 'react'
//import menus from '../../api/menu'



 const  menus = [
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

  }

  state = {filter:'GOODS_MENU'}

   render(){
     var me = this;
     return (

       <div className="sidebar">
           <ul>
           {me.state.filter}
           {
             menus.map((e,i)=>{
               let id = e.id;
               return <li key={e.id}><a href={'#'+e.href} className ={me.state.filter === e.id ? 'active':''}
                onClick={()=>me.setState({filter:id})}>{e.name}</a></li>
             })
           }
           </ul>
       </div>
     )
   }
}
export default LeftMenu
