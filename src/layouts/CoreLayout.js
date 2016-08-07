import React from 'react'
import { connect } from 'react-redux'
import Header from '../views/components/header'
import LeftMenu from '../views/components/leftMenu'

export default class CoreLayout extends React.Component {
  static propTypes = {
   children : React.PropTypes.element
  }
  render () {
    return (
      <div>
        <Header/>
        <div className="wrap">
          <LeftMenu />
          <div className="right">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
