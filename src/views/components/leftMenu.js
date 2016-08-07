import React from 'react'
import uxcore from 'uxcore'
import menu from 'api/menu'
class LeftMenu extends React.component{
  constructor(props, context) {
    super(props, context)
    this.state = { filter: 'GOODS_MENU'}
  }
   render(){
     let elm

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

     return (
       <div class="sidebar">
           <ul>
           {
             for(var x in menu){
               <li><a href={x.href} className={statesHover(x)} onClick={handleClick(x)}>{x.name}</a></li>
             }
           }
           </ul>
       </div>
     )
   }
}
