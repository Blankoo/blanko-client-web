import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './login-style.scss'

import { login } from '../../actions/'

class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			username: 'info@noudadrichem.com',
			password: 'test1234',
			message: null,
			success: true,
			forgotPassword: false,
			skeletonLeft: 100
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
						console.log('komt hij hier wel')
						this.props.history.push('/')
					}
				})
			})
	}

	onEnter(e) {
		if (e.key === 'Enter' && this.state.username !== '' && this.state.password !== '') {
			this.login()
		}
	}

	onType(e) { this.setState({ [e.target.name]: e.target.value }) }

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
		const { authenticated } = this.props
		const { success } = this.state
		const transitionOptions = {
      transitionName: 'fade',
			transitionEnterTimeout: 0,
      transitionEnter: true,
      transitionLeave: false
		}

		return (
			<div className="login" onKeyUp={this.onEnter}>
				<div className="sidebar-left">
				<div className="blanko">Blanko.</div>
						<ReactCSSTransitionGroup {...transitionOptions}>
						{ !this.state.forgotPassword  ?

						<div className="input-fields" key={1}>
							<input type="text" onChange={this.onType} name="username" value={this.state.username} placeholder="Username" autoFocus={true}
								className={success ? '' : 'error'}/>

							<input type="password" onChange={this.onType} value={this.state.password} name="password" placeholder="Password"
								className={success ? '' : 'error'}/>
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
								className={success ? '' : 'error'}/>
							<button onClick={this.sendForgotUsernameMail} className="login-button">Send reset email</button>
						</div>
					}

					</ReactCSSTransitionGroup>
				</div>

				<div className="skeleton" style={{ left: `${this.state.skeletonLeft}vw` }}></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
		authenticated: state.authenticationReducer.authenticated
  }
}
const mapActionsToProps = { login }

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login))
