import React from 'react'
import { connect } from 'react-redux'

import { deleteTask } from '../../actions'

const Task = ({ activeProjectId, deleteTask, task: { title, _id }}) => (
	<div>
		{ title } --
		<span onClick={() => deleteTask(activeProjectId, _id)}>X</span>
	</div>
)

const mapStateToProps = ({ projectReducer }) => ({
	activeProjectId: projectReducer.activeProject
})

export default connect(mapStateToProps, { deleteTask })(Task)
