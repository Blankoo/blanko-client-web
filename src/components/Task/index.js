import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTask, setTaskActive, updateTaskStatus } from '../../actions'
// Components
import Checkbox from '../Checkbox'

// Styles
import './Task.scss'

const Task = (props) => {
  const {
    setTaskActive,
    activeTask,
    task,
    updateTaskStatus,
    provided,
    archived
  } = props
  const isActive = activeTask !== undefined && activeTask._id === task._id
  const isDone = task.status === 'DONE'

  return (
    <div
      className={`task-small ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
      onClick={() => setTaskActive(task)}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Checkbox
        check={isDone}
        onClick={(e) => {
          e.stopPropagation()
          updateTaskStatus(task._id, task.status, archived)
        }}
      />
      <div className="task-small-title">{task.title}</div>
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
