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
		const { tasks, projectTitle, projectDescription } = this.props
		return (
			<div className="tasks-container">
				<div className="tasks-container-title">
					<h1>{ projectTitle }</h1>
					<p>{ projectDescription }</p>

				</div>

				{ tasks !== undefined && tasks.map((task, idx) => <Task key={idx} task={task}/> ) }

				{ projectTitle !== undefined && <AddTask/> }
			</div>
		)
	}
}

const mapStateToProps = ({ projectReducer }) => ({
	tasks: projectReducer.tasks,
	projectTitle: projectReducer.activeProject.projectTitle,
	projectDescription: projectReducer.activeProject.projectDescription
})

export default connect(mapStateToProps, { fetchTasks })(TasksContainer)
