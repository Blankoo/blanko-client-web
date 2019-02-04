import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchTasks, getSingleProject } from '../../actions'

// Components
import Task from '../Task'
import AddTask from '../AddTask'

// Styles
import './TaskContainer.scss'

class TasksContainer extends Component {
	componentDidMount() {
		const hasSelectedProject = window.localStorage.getItem('PROJ_ID')

		if(hasSelectedProject) {
			this.props.getSingleProject(hasSelectedProject)
			this.props.fetchTasks(hasSelectedProject)
		}
	}

	render() {
		const { tasks, projectTitle, projectDescription } = this.props
		return (
			<div className="tasks-container">
				<div className="tasks-container-title">
					<h1>{ projectTitle }</h1>
					<p>{ projectDescription }</p>
				</div>

				{
					tasks !== undefined && tasks.map((task, idx) => (
						<Task key={idx} task={task}/>
					))
				}

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

export default connect(mapStateToProps, { fetchTasks, getSingleProject })(TasksContainer)
