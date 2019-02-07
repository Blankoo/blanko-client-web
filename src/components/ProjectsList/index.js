import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTasks, toggleAddProjectModal, setSelectedProject } from '../../actions'

class ProjectList extends React.PureComponent {
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
        <div className="label">{ label }</div>

        {
          projects
            .filter(p => p.favorite === isFavorite)
            .map((project, idx) => {
              const { projectTitle, active = false } = project

              return (
                <li
                  key={idx}
                  onClick={() => this.selectProject(project)}
                  className={`projects-list-item ${active ? 'active' : 'not-active'}`}
                >
                  <span title={projectTitle}>{ projectTitle }</span>
                </li>
              )
            })
        }

        {
          !isFavorite && (
            <li onClick={toggleAddProjectModal}> + Add project</li>
          )
        }
      </ul>
      )
    )
  }
}

const mapStateToProps = ({ projectReducer }) => ({
  projects: projectReducer.projects
})

ProjectList.defaultProps = {
  className: '',
  isFavorite: false
}

ProjectList.propTypes = {
  projects: PropTypes.shape,
  className: PropTypes.string,
  label: PropTypes.string,
  isFavorite: PropTypes.bool,
  toggleAddProjectModal: PropTypes.func,
  fetchTasks: PropTypes.func,
  setSelectedProject: PropTypes.func
}

export default connect(mapStateToProps, { fetchTasks, toggleAddProjectModal, setSelectedProject })(ProjectList)
