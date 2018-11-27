import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import routes from './routes'
import './master.scss'

const STORE = configureStore()

ReactDOM.render(
  <Provider store={STORE}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root')
)
