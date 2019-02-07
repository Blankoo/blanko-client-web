import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTaskActive } from '../../actions'
import TimeMeasuring from '../TimeMeasuring'

// Styles
import './TaskDetail.scss'

class TaskDetail extends React.Component {
	state = {
		shown: false
	}

	render() {
		const isThereAnActiveTask = this.props.activeTask !== undefined

		return (
			<div className={`task-detail ${isThereAnActiveTask ? 'open' : 'closed'}`}>
				<span className="close-button" onClick={() => this.props.setTaskActive(undefined)}>x</span>
				{
					isThereAnActiveTask &&
					<>
						<h1>{ this.props.activeTask.title }</h1>
						<p>{ this.props.activeTask.subTitle }</p>
					</>
				}
				<TimeMeasuring/>
			</div>
		)
  }
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
