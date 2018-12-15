import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class ProjectList extends React.Component {
	render() {
		const { projects, className } = this.props

		return (
			projects !== undefined &&
				<ul className={`projects-list ${className}`}>
					{
						projects
							.map((project, idx) => {
								const { _id, projectTitle, favorite } = project

								return (
									<li key={idx} className={'active'} >
										<span title={ projectTitle }>{ projectTitle }</span>
										{/* <ProjectMenu
											iconVisibility={true}
											project={{ favorite: favorite, _id: _id }}
											setProjectFavorite={setProjectFavorite}
											deleteProject={deleteProject}
										/> */}
									</li>
								)

						})
					}
				</ul>
		)
	}
}

const mapStateToProps = (state) => ({
	projects: state.projectReducer.projects
})

export default connect(mapStateToProps, null)(ProjectList)


ProjectList.defaultProps = {
	className: ''
}

ProjectList.PropTypes = {
	projects: PropTypes.array,
	className: PropTypes.string
}
