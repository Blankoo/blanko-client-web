import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import {
    fetchTasks,
    toggleAddProjectModal,
    setSelectedProject,
    deleteProject,
    updateProject,
    toggleModal,
    setAllTasks,
    fetchAccumulatedProjectTime,
    showSidebar
} from '../../actions'

// Components
import ProjectKebabMenu from './ProjectKebabMenu'

// Styles
import './ProjectsList.scss'

class ProjectsList extends React.Component {
    goToProject = (projectId) => {
        this.props.history.push(`/home/project/${projectId}`)
        if (window.innerWidth < 400) {
            this.props.showSidebar()
        }
    }

    render() {
        const {
            projects,
            className,
            label,
            isFavorite,
            activeProjectId,
            updateProject,
            toggleModal
        } = this.props

        return (
            projects !== undefined && (
                <div className={`projects-list ${className}`}>

                    <div className="projects-list-title">
                        <div className="label">{label}</div>
                        {
                            !isFavorite && (
                                <Link className="add-project" to="/home/add-project">
                                    <img src={require('../../assets/icons/plus.svg')} alt="Add project" />
                                </Link>
                            )
                        }
                    </div>
                    <ul>
                        {
                            projects
                                .filter((project) => project.favorite === isFavorite)
                                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                .map((project, idx) => {
                                    const { projectTitle } = project

                                    return (
                                        <li
                                            key={idx}
                                            className={`projects-list-item ${project._id === activeProjectId ? 'active' : ''}`}
                                        >
                                            <a onClick={() => this.goToProject(project._id)}>{projectTitle}</a>

                                            <ProjectKebabMenu
                                                {...{
                                                    toggleModal,
                                                    updateProject,
                                                    projectId: project._id,
                                                    favorite: project.favorite
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

export default withRouter(connect(mapStateToProps, {
    fetchTasks,
    toggleAddProjectModal,
    setSelectedProject,
    deleteProject,
    updateProject,
    toggleModal,
    setAllTasks,
    fetchAccumulatedProjectTime,
    showSidebar
})(ProjectsList))
