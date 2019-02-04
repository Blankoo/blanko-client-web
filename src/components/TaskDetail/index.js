import React from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { setTaskActive } from '../../actions'
import './taskDetailStyle.scss'

class TaskDetail extends React.Component {
	state = {
		shown: false
	}
	render() {
		const isThereAnActiveTask = this.props.activeTask !== undefined
		return (
			<div className={`taskDetail ${isThereAnActiveTask ? 'open' : 'closed'}`}>
				<span onClick={() => this.props.setTaskActive(undefined)}>CLOSE</span>
				{
					isThereAnActiveTask &&
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
