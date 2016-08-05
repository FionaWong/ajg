import React from 'react'
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout'

// views must async load
//adverts
import Adverts from 'bundle?lazy!views/Adverts/'
//commodities

//Orders
//labels
//Supplier
// Account
import ConfirmPassword from 'bundle?lazy!views/Account/ConfirmPassword'

const loadContainerAsync = bundle => (location, cb) => {
  bundle(component => {
    cb(null, component)
  })
}

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute getComponent={loadContainerAsync(List)} title='商品管理'/>
    <Route      getComponent={loadContainerAsync(List)} path='/commodities' title='商品管理' />
    <Route      getComponent={loadContainerAsync(Detail)} path='/commodities/detail/:productId' title='产品详情' backPath='/product/list'/>

  </Route>
);
