import React, { PropTypes } from 'react'
import {
  connect
} from 'react-redux'
import {
  Link
} from 'react-router'
import {
  getProducts,
  resetProducts
} from 'actions'
import Infinite from 'react-infinite'



class Goods extends React.Component {

  static propTypes = {
    children : React.PropTypes.element
  }
  state ={
    isInfiniteLoading: false,
    filterActive: 0,
    isFilterOddActive: true,
    elements: []
  }
  render (){
    return (
      <div>
      <div className="panel-heading">
          商品管理
      </div>
      <div className="panel-body">
          <div className="tab-content">
            <div className="tab-pane fade active in" id="home">
              <div className="upload-link" style= { { width: '100%' } }>
              </div>
              <table className="table mt20" cellSpacing="1" >
                <tbody></tbody>
              </table>
            </div>
          </div>
      </div>
      </div>
    );
  }
}
export default Goods;
