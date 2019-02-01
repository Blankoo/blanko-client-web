import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTasks, toggleAddProjectModal } from '../../actions/'

class ProjectList extends React.Component {
	render() {
		const { projects, className, toggleAddProjectModal, fetchTasks, label, favorite } = this.props
		console.log({listFav: favorite})
		return (
			projects !== undefined &&
				<ul className={`projects-list ${className}`}>
					<label>{ label }</label>
					{
						projects
							.filter(p => p.favorite === favorite)
							.map((project, idx) => {
								const { _id, projectTitle, favorite, active = false } = project

								return (
									<li key={idx} className={`projects-list-item ${active ? 'active' : 'not-active'}`} onClick={() => fetchTasks(project)}>
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

export default connect(mapStateToProps, { fetchTasks, toggleAddProjectModal })(ProjectList)
