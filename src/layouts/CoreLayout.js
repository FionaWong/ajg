import React from 'react'
import { connect } from 'react-redux'
import {Header,LeftMenu} from 'views/components'


export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }
  render () {
    return (
      <Header></Header>
      <div class="wrap">
        <LeftMenu></LeftMenu>
          <!--Right Start-->
          <div class="right">
          {this.props.children}
          </div>
      </div>
    );
  }
}
