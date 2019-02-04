import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Sidebar from '../../components/Sidebar'
import TasksContainer from '../../components/tasksContainer'
import AddProjectModal from '../../components/AddProjectModal'
import TaskDetail from '../../components/TaskDetail'

import * as actions from '../../actions'

import './homeStyle.scss'

class Home extends Component {
	componentDidMount() {
		this.props.fetchProjects()
	}

	render() {
		const { toggleAddProjectModal, addProject } = this.props

		return (
			<div id="app">
				<Sidebar/>
				<TasksContainer/>
				<TaskDetail/>

				<AddProjectModal {...{
					toggleAddProjectModal,
					addProject
				}}/>
			</div>
		)
	}
}


export default withRouter(connect(null, actions)(Home))
