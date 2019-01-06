import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import TasksContainer from '../components/tasksContainer'
import AddProjectModal from '../components/AddProjectModal'

import * as actions from '../actions'

class Home extends Component {
	componentDidMount() {
		this.props.fetchProjects()
	}

	render() {
		const { toggleAddProjectModal, addProject } = this.props

		return (
			<>
				<Sidebar/>
				<TasksContainer/>
				<AddProjectModal {...{
					toggleAddProjectModal,
					addProject
				}}/>
			</>
		)
	}
}


export default withRouter(connect(null, actions)(Home))
