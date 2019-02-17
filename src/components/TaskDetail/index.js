import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTaskActive } from '../../actions'
import TimeMeasuring from '../TimeMeasuring'

// Components
import Checkbox from '../Checkbox'

// Styles
import './TaskDetail.scss'

const TaskDetail = (props) => {
  const {
    activeTask,
    setTaskActive
  } = props

  const isThereAnActiveTask = activeTask !== undefined

  return (
    <div className={`task-detail ${isThereAnActiveTask ? 'open' : 'closed'}`}>
      <span className="close" onClick={() => setTaskActive(undefined)}>
        <img src={require('../../assets/icons/cross.svg')} alt="Close task detail" />
      </span>

      {
        isThereAnActiveTask && (
          <>
            <div className="task-detail-top">
              <div className="title">
                <Checkbox />
                <h1>{activeTask.title}</h1>
              </div>
              <p>{activeTask.subTitle}</p>
            </div>
            <TimeMeasuring/>
          </>
        )
      }
    </div>
  )
}

TaskDetail.propTypes = {
  activeTask: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string
  })

}

const mapStateToProps = ({ projectReducer }) => {
  console.log('task detail ', projectReducer)
  return {
    activeTask: projectReducer.activeTask
  }
}
export default connect(mapStateToProps, { setTaskActive })(TaskDetail)
