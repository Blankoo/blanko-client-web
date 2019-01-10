import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {fetchTasks, toggleAddProjectModal} from '../../actions/'

class ProjectList extends React.Component {
	render() {
		const { projects, className, toggleAddProjectModal, fetchTasks } = this.props

		return (
			projects !== undefined &&
				<ul className={`projects-list ${className}`}>
					{
						projects
							.map((project, idx) => {
								const { _id, projectTitle, favorite } = project

								return (
									<li key={idx} className={'active'} onClick={() => fetchTasks(project._id)}>
										<span title={ projectTitle }>{ projectTitle }</span>
									</li>
								)

						})
					}
					<li onClick={toggleAddProjectModal}> + Add project</li>
				</ul>
		)
	}
}

const mapStateToProps = ({ projectReducer }) => ({
	projects: projectReducer.projects
})

ProjectList.defaultProps = {
	className: ''
}

ProjectList.propTypes = {
	projects: PropTypes.array,
	className: PropTypes.string
}

export default connect(mapStateToProps, { fetchTasks, toggleAddProjectModal })(ProjectList)
