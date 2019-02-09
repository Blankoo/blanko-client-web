import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTasks, getSingleProject } from '../../actions'

// Components
import Task from '../Task'
import AddTask from '../AddTask'

// Styles
import './TaskContainer.scss'

class TasksContainer extends Component {
  componentDidMount() {
    const hasSelectedProject = window.localStorage.getItem('PROJ_ID')
    const { getSingleProject, fetchTasks } = this.props

    if (hasSelectedProject) {
      getSingleProject(hasSelectedProject)
      fetchTasks(hasSelectedProject)
    }
  }

  render() {
    const { tasks, projectTitle, projectDescription } = this.props

    return (
      <div className="tasks-container">
        <div className="tasks-container-title">
          <h1>{projectTitle}</h1>
          <p>{projectDescription}</p>
        </div>

        {
          tasks !== undefined && tasks.map((task, idx) => (
            <Task key={idx} task={task} />
          ))
        }

        {projectTitle !== undefined && <AddTask />}
      </div>
    )
  }
}

TasksContainer.propTypes = {
  tasks: PropTypes.instanceOf(Array),
  projectTitle: PropTypes.string,
  projectDescription: PropTypes.string,
  getSingleProject: PropTypes.func,
  fetchTasks: PropTypes.func
}

const mapStateToProps = ({ projectReducer }) => ({
  tasks: projectReducer.tasks,
  projectTitle: projectReducer.activeProject.projectTitle,
  projectDescription: projectReducer.activeProject.projectDescription
})

export default connect(mapStateToProps, { fetchTasks, getSingleProject })(TasksContainer)
