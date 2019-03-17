import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  fetchTasks,
  toggleAddProjectModal,
  setSelectedProject,
  deleteProject,
  updateProject
} from '../../actions'

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
      isFavorite,
      activeProjectId,
      deleteProject,
      updateProject
    } = this.props

    return (
      projects !== undefined && (
      <ul className={`projects-list ${className}`}>
        <div className="projects-list-title">
          <div className="label">{ label }</div>
          {
            !isFavorite && (
              <span className="add-project" onClick={toggleAddProjectModal}>
                <img src={require('../../assets/icons/plus.svg')} alt="Add project" />
              </span>
            )
          }
        </div>

        {
          projects
            .filter(p => p.favorite === isFavorite)
            .map((project, idx) => {
              const { projectTitle } = project

              return (
                <li
                  key={idx}
                  className={`projects-list-item ${project._id === activeProjectId ? 'active' : ''}`}
                >
                  <span onClick={() => this.selectProject(project)} >{ projectTitle }</span>
                  <span onClick={() => deleteProject(project._id) }>DELETE</span>
                  <span onClick={() => updateProject(project._id) }>FAV</span>
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
  projects: projectReducer.projects,
  activeProjectId: projectReducer.activeProjectId
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
  setSelectedProject: PropTypes.func,
  activeProjectId: PropTypes.string
}

export default connect(mapStateToProps, {
  fetchTasks,
  toggleAddProjectModal,
  setSelectedProject,
  deleteProject,
  updateProject
})(ProjectsList)
