import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

export default class Aderts extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }
  render () {
    return (

      <div className="wrap">
        adverts
      </div>
    );
  }
}
