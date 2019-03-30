import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  setTaskActive,
  updateTaskStatus,
  deleteTask,
  toggleModal,
} from '../../actions'
import TimeMeasuring from '../TimeMeasuring'
import { DELETE_TASK } from '../../contstants/actionTypes'

// Components
import Checkbox from '../Checkbox'
import Button from '../Button'
import TaskDescription from './TaskDescription'

// Styles
import './TaskDetail.scss'

const TaskDetail = (props) => {
  const {
    activeTask,
    setTaskActive,
    updateTaskStatus,
    toggleModal
  } = props

  const isThereAnActiveTask = activeTask !== undefined

  return (
    <div className={`task-detail ${isThereAnActiveTask ? 'open' : 'closed'}`}>
      <span className="close" onClick={() => setTaskActive(undefined)}>
        <img src={require('../../assets/icons/cross.svg')} alt="Close task detail" />
      </span>


      <div className="task-detail-main-container">
      {
        isThereAnActiveTask && (
          <>
            <div className="task-detail-top">
              <div className="title">
              <Checkbox check={activeTask.status === 'DONE'} onClick={e => updateTaskStatus(activeTask._id, activeTask.status)} />
                <h1>{activeTask.title}</h1>
              </div>
            </div>

            <TaskDescription currentDescription={activeTask.subTitle}/>
            <TimeMeasuring/>
          </>
        )
      }
      </div>

      <div className="task-detail-bottom">
        <Button text="Edit" variant="secondary" size="md"/>
        <Button text="Delete" variant="danger secondary" size="md" onClick={() => toggleModal('isVerificationShown', true, DELETE_TASK)}/>
      </div>
    </div>
  )
}

TaskDetail.propTypes = {
  activeTask: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string
  })
}

const mapStateToProps = ({ projectReducer }) => ({
  activeTask: projectReducer.activeTask
})

export default connect(mapStateToProps, { setTaskActive, updateTaskStatus, deleteTask, toggleModal })(TaskDetail)
