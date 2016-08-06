import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/lib/createHashHistory'
import configureStore from './store/configureStore'
import Root from './containers/root'
import 'styles/ajg.scss'
import { syncReduxAndRouter } from 'redux-simple-router'
// import Oxygen from 'hooks/oxygen'

const store = configureStore()
const history = createHistory({
  queryKey: false
})


syncReduxAndRouter(history, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
