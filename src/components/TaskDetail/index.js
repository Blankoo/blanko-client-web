import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTaskActive } from '../../actions'

// Styles
import './TaskDetail.scss'

const TaskDetail = (props) => {
  const {
    activeTask
  } = props

  const isThereAnActiveTask = activeTask !== undefined

  return (
    <div className={`task-detail ${isThereAnActiveTask ? 'open' : 'closed'}`}>
      <span onClick={() => setTaskActive(undefined)}>
        CLOSE
      </span>

      {
        isThereAnActiveTask && (
          <>
            <h1>{activeTask.title}</h1>
            <p>{activeTask.subTitle}</p>
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
