import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from '../layouts/CoreLayout'

// views must async load
//adverts
import Adverts from 'bundle?lazy!../views/Adverts/Adverts'
//goods
import Goods from 'bundle?lazy!../views/Goods/Goods'
//Orders
//labels
//Supplier
const loadContainerAsync = bundle => (location, cb) => {
  bundle(component => {
    cb(null, component)
  })
}

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute getComponent={loadContainerAsync(Goods)}  title='商品管理'/>
    <Route getComponent={loadContainerAsync(Goods)} path='/goods' title='商品管理'/>

  </Route>
);
