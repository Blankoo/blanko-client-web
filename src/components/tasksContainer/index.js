import React, { Component } from 'react'
import { connect } from 'react-redux'
import './taskContainerStyle.scss'

class TasksContainer extends Component {
	render() {
		const { tasks } = this.props

		return (
			<div className="tasks-container">
				<h1>Project title</h1>

				{ tasks !== undefined &&
					tasks.map(task => {
						console.log({ task })
						return (
							<div>{task.title}</div>
						)
					})
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log('taskcontainer', state)
	return {}
}

export default connect(mapStateToProps, null)(TasksContainer)
