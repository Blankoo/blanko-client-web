import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import TasksContainer from '../components/tasksContainer'

import { fetchProjects } from '../actions'

class Home extends Component {
	componentDidMount() {
		const { fetchProjects } = this.props
		fetchProjects()
	}
	render() {
		return (
			<>
				<Sidebar/>
				<TasksContainer/>
			</>
		)
	}
}


export default withRouter(connect(null, { fetchProjects })(Home))
