import React, { Component } from 'react'
import { connect } from 'react-redux'
import './taskContainerStyle.scss'

import {fetchTasks} from '../../actions'

import Task from '../Task'
import AddTask from '../AddTask'

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

				<AddTask/>
			</div>
		)
	}
}

const mapStateToProps = ({ projectReducer }) => ({
		tasks: projectReducer.tasks,
		activeId: projectReducer.activeId
	})

export default connect(mapStateToProps, { fetchTasks })(TasksContainer)
