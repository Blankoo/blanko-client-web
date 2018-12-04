import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import './master.scss'

import Error from './containers/404'
import Home from './pages/Home'
import Login from './pages/Login'

const STORE = configureStore()
const auto = false

STORE.subscribe(e => console.log(STORE.getState()))
console.log(STORE.getState())

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
