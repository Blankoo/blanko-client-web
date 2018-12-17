import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './login-style.scss'

import { login, fetchProjects } from '../../actions/'

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: 'info@noudadrichem.com',
			password: 'test1234',
			message: '',
			success: false,
			forgotPassword: false,
			skeletonLeft: 40
		}

		this.onType = this.onType.bind(this)
		this.login = this.login.bind(this)
		this.onEnter = this.onEnter.bind(this)
		this.toggleForgotPassword = this.toggleForgotPassword.bind(this)
		this.sendForgotUsernameMail = this.sendForgotUsernameMail.bind(this)
	}

	login() {
		const userBody = {
			username: this.state.username,
			password: this.state.password
		}

		this.props.login(userBody)
			.then(({payload}) => {
				this.setState({
					success: payload.success
				}, () => {
					if(this.state.success) {
						window.localStorage.setItem('USER_TOK',  payload.token)
						setTimeout(() => {
							this.props.fetchProjects()
							this.props.history.push('/')
						}, 1100)
					} else {
						this.setState({
							message: payload.message
						})
					}
				})
			})
	}

	onEnter(e) {
		if (e.key === 'Enter' && this.state.username !== '' && this.state.password !== '') {
			this.login()
		}
	}

	onType(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	toggleForgotPassword() {
		this.setState(({ forgotPassword }) => ({
			forgotPassword: !forgotPassword
		}))
	}

	sendForgotUsernameMail() {
		const { username } = this.state
		console.log(username);
		// add('account/forgot', undefined, { username })
		// 	.then(res => {
		// 		console.log('forgot email: ', res)
		// 	})
	}

	render() {
		const { success, message } = this.state
		const transitionOptions = {
      transitionName: 'fade',
			transitionEnterTimeout: 0,
      transitionEnter: true,
      transitionLeave: false
		}

		const isSuccessfull = success && message.length !== 0
		console.log('message.length', message.length)

		return (
			<div className="login" onKeyUp={this.onEnter}>
				<div className="sidebar-left">
				<div className="blanko">Blanko.</div>
						<ReactCSSTransitionGroup {...transitionOptions}>
						{ !this.state.forgotPassword  ?

						<div className="input-fields" key={1}>
							<input
								type="text"
								onChange={this.onType}
								name="username"
								value={this.state.username}
								placeholder="Username"
								autoFocus={true}
								className={message.length > 0 ? 'error' : ''}
							/>

							<input type="password" onChange={this.onType} value={this.state.password} name="password" placeholder="Password"
								className={message.length > 0 ? 'error' : ''}/>
							<button onClick={this.login} className="login-button">Login</button>

							<span className="links">
								<a href="https://noudadrichem.com" className="link small">Sign up</a>
								<button className="link small" onClick={this.toggleForgotPassword}>Forgot password</button>
							</span>
						</div>

						:

						<div className="forgot-password" key={2}>
							<button className="link move-to-left" onClick={this.toggleForgotPassword}>← Go back to login</button>
							<p>Please provide the email your account is registerd with so we can send you a recovery email.</p>

							<input type="text" onChange={this.onType} name="username" placeholder="Email address" autoFocus={true}
								className={message.length > 0 ? 'error' : ''}/>
							<button onClick={this.sendForgotUsernameMail} className="login-button">Send reset email</button>
						</div>
					}

					</ReactCSSTransitionGroup>
				</div>

				<div className={`skeleton ${success ? 'login-succes' : ''}`} ></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
		authenticated: state.authenticationReducer.authenticated
  }
}
const mapActionsToProps = { login, fetchProjects }

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login))
