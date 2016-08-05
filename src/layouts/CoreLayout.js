import React from 'react'
import { connect } from 'react-redux'
import { resetAccount } from 'actions'
import { App } from 'utils/native'

@connect( state => ({
  account: state.account
}), {
  resetAccount
})

export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.account.isLogin){
        if(App.isNative) {
          App.call("neonLogin")
          nextProps.resetAccount()
          location.reload()
          return
       }
      window.location.href = process.env.DEV_ENV === 'production'
        ? "http://m.pingan.com/chaoshi/wap/login.do?appid=10183&ptag=http://m.pingan.com/chaoshi/dqlc/index.shtml#/"
        : "http://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi/wap/login.do?appid=10183&ptag=http://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi/dqlc/index.shtml#/"
      // window.location.href =  "http://m.pingan.com/chaoshi/wap/login.do?appid=10183&ptag=http://m.pingan.com/chaoshi/dqlc/index.shtml#/"

    }
  }
  render () {
    return (
      <div className='page-container' style={{marginTop: !App.isHighVersion ? '0' : '-42px'}}>
        <div className='view-container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
