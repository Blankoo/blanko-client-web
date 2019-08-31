import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  fetchTasks,
  toggleAddProjectModal,
  setSelectedProject,
  deleteProject,
  updateProject,
  toggleModal,
  setAllTasks
} from '../../actions'

// Components
import ProjectKebabMenu from './ProjectKebabMenu'

import { DELETE_PROJECT } from '../../contstants/actionTypes'


// Styles
import './ProjectsList.scss'

class ProjectsList extends React.PureComponent {
  selectProject = (project) => {
    const { fetchTasks, setSelectedProject } = this.props

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
      updateProject,
      toggleModal,
      setAllTasks
    } = this.props

    return (
      projects !== undefined && (
        
        <div className={`projects-list ${className}`}>
        { 
          isFavorite && 
            <button 
              className={`button tertiary lg full-width inbox-btn ${activeProjectId === 'all' ? 'active' : ''}`}
              type="button"
              onClick={setAllTasks}
            >
              All
            </button>
        }

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
        <ul>
        {
          projects
            .filter(project => project.favorite === isFavorite)
            .map((project, idx) => {
              const { projectTitle } = project

              return (
                <li
                  key={idx}
                  className={`projects-list-item ${project._id === activeProjectId ? 'active' : ''}`}
                >
                  <span onClick={() => this.selectProject(project)} >{ projectTitle }</span>

                  <ProjectKebabMenu
                    {...{
                      toggleModal,
                      updateProject,
                      projectId: project._id,
                      DELETE_PROJECT
                    }}
                  />
                </li>
              )
            })
        }
        </ul>
      </div>
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
  updateProject,
  toggleModal,
  setAllTasks
})(ProjectsList)
