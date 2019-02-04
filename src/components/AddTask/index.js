import React from 'react'
import { connect } from 'react-redux'
import { addTask } from '../../actions'

// Components
import Button from '../Button'

// Styles
import './AddTask.scss'

class AddTask extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			title: '',
			subTitle: '',
		}
	}

	setInputState = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	addLocalTask = () => {
		if(this.state.title.length > 1) {
			this.props.addTask(this.state, this.props.activeProjectId)
			this.setState({
				title: '',
				subTitle: ''
			})
		}
	}

	render() {
		return  (
			<div>
				<input
					type="text"
					id="title"
					value={this.state.title}
					onChange={e => this.setInputState(e)}
				/>

				<input
					type="text"
					id="subTitle"
					value={this.state.subTitle}
					onChange={e => this.setInputState(e)}
				/>

				<Button
					onClick={this.addLocalTask}
					variant="secondary"
					text="Add Task"
				/>
			</div>
		)
	}
}

const mapStateToProps = ({ projectReducer }) => ({
	activeProjectId: projectReducer.activeProjectId
})

export default connect(mapStateToProps, { addTask })(AddTask)
