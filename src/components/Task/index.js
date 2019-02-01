import React from 'react'
import { connect } from 'react-redux'

import { deleteTask } from '../../actions'

const Task = ({ activeProjectId, deleteTask, task}) => {
	console.log({task})
	return (
		<div>
			{ task.title } --
			<span onClick={() => deleteTask(activeProjectId, task._id)}>X</span>
		</div>
	)
}

const mapStateToProps = ({ projectReducer }) => ({
	activeProjectId: projectReducer.activeProjectId
})

export default connect(mapStateToProps, { deleteTask })(Task)

