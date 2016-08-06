import React from 'react'
import uxcore from 'uxcore'

class Header extends React.component{
   render(){
     
     return (
       <div class="sidebar">
           <ul>
               <li><a href="adverts" className="active">广告位管理</a></li>
               <li><a href="goods">商品管理</a></li>
               <li><a href="labels">商品标签管理</a></li>
               <li><a href="orders">订单管理</a></li>
               <li><a href="suppliers">供应商管理</a></li>
           </ul>
       </div>
     )
   }
}
