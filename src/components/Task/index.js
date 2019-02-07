import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTask, setTaskActive } from '../../actions'

// Components
import Checkbox from '../Checkbox'

// Styles
import './Task.scss'

const Task = ({ activeProjectId, setTaskActive, activeTask, task }) => {
  const isActive = activeTask !== undefined && (
    activeTask._id === task._id
  )

  /* TODO: Check if Task is done */
  const isDone = false

  return (
    <div
      className={`task-small ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
      onClick={() => setTaskActive(task)}
    >
      <Checkbox check={task.status === 'DONE'} />

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
  activeTask: PropTypes.string,
  task: PropTypes.shape
}

const mapStateToProps = ({ projectReducer }) => ({
  activeProjectId: projectReducer.activeProjectId,
  activeTask: projectReducer.activeTask
})

export default connect(mapStateToProps, { deleteTask, setTaskActive })(Task)
