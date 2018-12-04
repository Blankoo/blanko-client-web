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


// STORE.getState().authenticationReducer.authenticated
const GuardedRoute = ({ component: Component, ...rest }) => (
  <Route exact {...rest} render={(props) => (
		true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

ReactDOM.render(
  <Provider store={STORE}>
    <BrowserRouter>
			<>
				<GuardedRoute path="/" component={Home} />
				<Route exact path="/login" component={Login}/>
			</>
		</BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
