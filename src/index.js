import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './master.scss'

import Error from './containers/404'
import Home from './pages/Home'
import Login from './pages/Login'


import { login, authenticate } from './actions'
const STORE = configureStore()
console.log({STORE})
const auto = false

const unsubscribe = STORE.subscribe(() => console.log(STORE.getState()))

STORE.dispatch(login('dispatched a login'))

unsubscribe()

const GuardedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auto
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

ReactDOM.render(
  <Provider store={STORE}>
    <BrowserRouter >
			<>
				<GuardedRoute exact path="/" component={Home} />
				<Route path="/login" component={Login}/>
				<Route component={Error}/>
			</>
		</BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
