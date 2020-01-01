import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Reset from './pages/Reset'

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
        {...rest}
        render={(props) => (
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
                <GuardedRoute path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/reset-password/:token" component={Reset} />
                <Route exact path="/" render={() => <Redirect to="/login" />} />
            </>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
