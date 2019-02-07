import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTasks, toggleAddProjectModal, setSelectedProject } from '../../actions'

// Styles
import './ProjectsList.scss'

class ProjectsList extends React.PureComponent {
  selectProject = (project) => {
    const { fetchTasks, setSelectedProject } = this.props

    window.localStorage.setItem('PROJ_ID', project._id)
    fetchTasks(project._id)
    setSelectedProject(project)
  }

  render() {
    const {
      projects,
      className,
      toggleAddProjectModal,
      label,
      isFavorite
    } = this.props

    return (
      projects !== undefined && (
      <ul className={`projects-list ${className}`}>
        <div className="projects-list-title">
          <div className="label">{ label }</div>
          {
            !isFavorite && (
              <span className="add-project" onClick={toggleAddProjectModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9">
                  <path fill="#7A848F" d="M4.5,3.5 L7.5,3.5 C7.77614237,3.5 8,3.72385763 8,4 C8,4.27614237 7.77614237,4.5 7.5,4.5 L4.5,4.5 L4.5,7.5 C4.5,7.77614237 4.27614237,8 4,8 C3.72385763,8 3.5,7.77614237 3.5,7.5 L3.5,4.5 L0.5,4.5 C0.223857625,4.5 0,4.27614237 0,4 C0,3.72385763 0.223857625,3.5 0.5,3.5 L3.5,3.5 L3.5,0.5 C3.5,0.223857625 3.72385763,5.07265313e-17 4,0 C4.27614237,-5.07265313e-17 4.5,0.223857625 4.5,0.5 L4.5,3.5 Z" transform="translate(.6 .5)" />
                </svg>
              </span>
            )
          }
        </div>

        {
          projects
            .filter(p => p.favorite === isFavorite)
            .map((project, idx) => {
              const { projectTitle, active = false } = project

              return (
                <li
                  key={idx}
                  onClick={() => this.selectProject(project)}
                  className={`projects-list-item ${active ? 'active' : ''}`}
                >
                  <span>{ projectTitle }</span>
                </li>
              )
            })
        }
      </ul>
      )
    )
  }
}

const mapStateToProps = ({ projectReducer }) => ({
  projects: projectReducer.projects
})

ProjectsList.defaultProps = {
  className: '',
  isFavorite: false
}

ProjectsList.propTypes = {
  projects: PropTypes.instanceOf(Array),
  className: PropTypes.string,
  label: PropTypes.string,
  isFavorite: PropTypes.bool,
  toggleAddProjectModal: PropTypes.func,
  fetchTasks: PropTypes.func,
  setSelectedProject: PropTypes.func
}

export default connect(mapStateToProps, { fetchTasks, toggleAddProjectModal, setSelectedProject })(ProjectsList)
