import React, { Component } from 'react'
import { connect } from 'react-redux'
import './taskContainerStyle.scss'

import {fetchTasks} from '../../actions'

import Task from '../Task'

class TasksContainer extends Component {
	componentDidMount() {
		fetchTasks()
	}


	render() {
		const { tasks } = this.props

		return (
			<div className="tasks-container">
				<h1>Project title</h1>

				{ tasks !== undefined && tasks.map(task => <Task task={task}/> ) }
			</div>
		)
	}
}

const mapStateToProps = state => {
	// console.log('taskcontainer', state)
	return {
		tasks: state.projectReducer.tasks,
		activeId: state.projectReducer.activeId
	}
}

export default connect(mapStateToProps, { fetchTasks })(TasksContainer)
