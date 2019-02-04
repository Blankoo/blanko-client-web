import React from 'react'
import { connect } from 'react-redux'
import './addProjectModalStyle.scss'

class AddProjectModal extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			projectTitle: '',
			projectDescription: ''
		}
	}

	onChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	render() {
		const { toggleAddProjectModal, addProjectShown, addProject } = this.props

		return addProjectShown && (
			<div className="add-project-modal">
				<div>
					<div onClick={toggleAddProjectModal}>X</div>
					<div>
						<label>Project Title</label>
						<input id="projectTitle" onChange={this.onChange}/>

						<label>Description</label>
						<input id="projectDescription" onChange={this.onChange}/>

						<button onClick={toggleAddProjectModal}>Cancel</button>
						<button onClick={() => addProject(this.state)}>Add project</button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ projectReducer }) => ({
	addProjectShown: projectReducer.addProjectShown
})

export default connect(mapStateToProps)(AddProjectModal)
