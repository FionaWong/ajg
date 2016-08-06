import React from 'react'
import { connect } from 'react-redux'
import { resetAccount } from 'actions'
import {Header} from 'views/components/header'
@connect( state => ({

}), {

})

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }
  componentWillReceiveProps(nextProps) {


  }
  render () {
    return (
      <Header></Header>
      <div class="wrap">

          <div class="sidebar">
              <ul>
                  <li><a href="index.html" class="active">广告位管理</a></li>
                  <li><a href="product.html">商品管理</a></li>
                  <li><a href="label.html">商品标签管理</a></li>
                  <li><a href="order.html">订单管理</a></li>
                  <li><a href="supplier.html">供应商管理</a></li>
              </ul>
          </div>

          <!--Right Start-->
          <div class="right">
          {this.props.children}
          </div>
      </div>
    );
  }
}
