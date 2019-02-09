import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setTaskActive } from '../../actions'
import './taskDetailStyle.scss'

class TaskDetail extends React.Component {
	state = {
		shown: true
	}
	render() {
		const isThereAnActiveTask = this.props.activeTask !== undefined
		return (
			<div className={`taskDetail ${isThereAnActiveTask ? 'open' : 'closed'}`}>
				<span onClick={() => this.props.setTaskActive(undefined)}>CLOSE</span>
				{
					isThereAnActiveTask && this.state.shown &&
					<>
						<h1>{ this.props.activeTask.title }</h1>
						<p>{ this.props.activeTask.subTitle }</p>
					</>
				}
			</div>
		)
	}
}

const mapStateToProps = ({ projectReducer }) => {
  console.log('task detail ', projectReducer)

  return {
    activeTask: projectReducer.activeTask
  }
}

export default connect(mapStateToProps, { setTaskActive })(TaskDetail)
