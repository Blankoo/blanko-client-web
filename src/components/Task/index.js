import React from 'react'
import { connect } from 'react-redux'

import { deleteTask } from '../../actions'

import Checkbox from '../Checkbox'

import './taskStyle.scss'

const Task = ({ activeProjectId, deleteTask, task}) => {
	return (
		<div className="task-small">
			<Checkbox check={task.status === 'DONE'}/>
			<div>
				<div className="task-small-title">{ task.title }</div>
				{ task.subTitle !== '' && <div className="task-small-sub">{ task.subTitle }</div> }
			</div>
			{/* <span onClick={() => deleteTask(activeProjectId, task._id)}>X</span> */}
		</div>
	)
}

const mapStateToProps = ({ projectReducer }) => ({
	activeProjectId: projectReducer.activeProjectId
})

export default connect(mapStateToProps, { deleteTask })(Task)

