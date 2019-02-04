import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTasks, toggleAddProjectModal, setSelectedProject } from '../../actions/'

class ProjectList extends React.PureComponent {
	selectProject = project => {
		window.localStorage.setItem('PROJ_ID', project._id)
		this.props.fetchTasks(project._id)
		this.props.setSelectedProject(project)
	}

	render() {
		const { projects, className, toggleAddProjectModal, label, favorite } = this.props

		return (
			projects !== undefined &&
				<ul className={`projects-list ${className}`}>
					<label>{ label }</label>
					{
						projects
							.filter(p => p.favorite === favorite)
							.map((project, idx) => {
								const { projectTitle, active = false } = project

								return (
									<li key={idx} className={`projects-list-item ${active ? 'active' : 'not-active'}`} onClick={() => this.selectProject(project)}>
										<span title={ projectTitle }>{ projectTitle }</span>
									</li>
								)

						})
					}
					{ !favorite && <li onClick={toggleAddProjectModal}> + Add project</li>}
				</ul>
		)
	}
}

const mapStateToProps = ({ projectReducer }) => ({
	projects: projectReducer.projects
})

ProjectList.defaultProps = {
	className: '',
	favorite: false
}

ProjectList.propTypes = {
	projects: PropTypes.array,
	className: PropTypes.string
}

export default connect(mapStateToProps, { fetchTasks, toggleAddProjectModal, setSelectedProject })(ProjectList)
