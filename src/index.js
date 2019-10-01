import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

// import Error from './containers/404'
import Home from './pages/Home'
import Login from './pages/Login'

// Styles
import './master.scss'

const STORE = configureStore()
STORE.subscribe(() => console.info(STORE.getState()))

function isAuthenticated() {
  const token = window.localStorage.getItem('USER_TOK')
  const authenticated = STORE.getState().authenticationReducer.authenticated

  return (token && authenticated)
}

const GuardedRoute = ({ component: Component, ...rest }) => (
  <Route
    exact {...rest}
    render={props => (
      isAuthenticated()
      ? <Component {...props} />
      : <Redirect to="/login" />
    )}
  />
)

ReactDOM.render(
  <Provider store={STORE}>
    <BrowserRouter>
      <>
        <GuardedRoute path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
