import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTask, setTaskActive, updateTaskStatus } from '../../actions'

// Components
import Checkbox from '../Checkbox'

// Styles
import './Task.scss'

const Task = ({
  setTaskActive,
  activeTask,
  task,
  updateTaskStatus
}) => {
  const isActive = activeTask !== undefined && (
    activeTask._id === task._id
  )

  return (
    <div
      className={`task-small ${isActive ? 'active' : ''} ${task.status ? 'DONE' : ''}`}
      onClick={() => setTaskActive(task)}
    >
      <Checkbox check={task.status === 'DONE'} onClick={() => updateTaskStatus(task._id, task.status)} />

      <div>
        <div className="task-small-title">{task.title}</div>
        {
          task.subTitle !== '' && (
            <div className="task-small-sub">{task.subTitle}</div>
          )
        }
      </div>
    </div>
  )
}

Task.propTypes = {
  setTaskActive: PropTypes.func,
  activeTask: PropTypes.instanceOf(Object),
  task: PropTypes.instanceOf(Object)
}

const mapStateToProps = ({ projectReducer }) => ({
  activeTask: projectReducer.activeTask
})

export default connect(mapStateToProps, { deleteTask, setTaskActive, updateTaskStatus })(Task)
