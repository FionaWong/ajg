import React from 'react'
import { connect } from 'react-redux'

export default class Goods extends React.Component {
  @connect({

  },{

  })
  static propTypes = {
    children : React.PropTypes.element
  }
  render () {
    return (
      <div className="panel-heading">
          商品管理
      </div>
      <div class="panel-body">
          <div class="tab-content">
            <div class="tab-pane fade active in" id="home">
              <div class="upload-link" style="width: 100%;">
              </div>
              <table class="table mt20" cellspacing="1" >

              </table>
            </div>
          </div>
      </div>
    );
  }
}
