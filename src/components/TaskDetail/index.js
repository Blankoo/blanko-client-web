import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTaskActive } from '../../actions'

// Components
import Checkbox from '../Checkbox'

// Styles
import './TaskDetail.scss'

const TaskDetail = (props) => {
  const {
    activeTask
  } = props

  const isThereAnActiveTask = activeTask !== undefined

  return (
    <div className={`task-detail ${isThereAnActiveTask ? 'open' : 'closed'}`}>
      <span className="close" onClick={() => setTaskActive(undefined)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
          <path fill="#7A848F" d="M424.707511,20.0000834 L427.853411,16.8540516 C428.048863,16.6587588 428.048863,16.3418875 427.853411,16.1465947 C427.65796,15.9511351 427.341435,15.9511351 427.145984,16.1465947 L424.000083,19.2926265 L420.854016,16.1465947 C420.658565,15.9511351 420.34204,15.9511351 420.146589,16.1465947 C419.951137,16.3418875 419.951137,16.6587588 420.146589,16.8540516 L423.292656,20.0000834 L420.146589,23.1461152 C419.951137,23.341408 419.951137,23.6582793 420.146589,23.8535721 C420.244314,23.9511351 420.372392,24 420.500302,24 C420.628213,24 420.75629,23.9511351 420.854016,23.8534053 L424.000083,20.7073735 L427.145984,23.8534053 C427.24371,23.9511351 427.371787,24 427.499698,24 C427.627608,24 427.755686,23.9511351 427.853411,23.8534053 C428.048863,23.6581125 428.048863,23.3412412 427.853411,23.1459484 L424.707511,20.0000834 Z" transform="translate(-420 -16)" />
        </svg>
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
