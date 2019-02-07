import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTasks, getSingleProject } from '../../actions'

// Components
import Task from '../Task'
import AddTask from '../AddTask'
import FilterBar from '../FilterBar'

// Styles
import './TaskContainer.scss'

class TasksContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFilterBarSticky: false
    }

    this.filterBar = React.createRef()
    this.tasksContainer = React.createRef()
  }

  componentDidMount() {
    const hasSelectedProject = window.localStorage.getItem('PROJ_ID')
    const { getSingleProject, fetchTasks } = this.props

    if (hasSelectedProject) {
      getSingleProject(hasSelectedProject)
      fetchTasks(hasSelectedProject)
    }

    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    if (window.scrollY < 146) {
      this.setState({
        isFilterBarSticky: false
      })
    } else if (window.scrollY > 146) {
      this.setState({
        isFilterBarSticky: true
      })
    }
  }

  render() {
    const { tasks, projectTitle, projectDescription } = this.props
    const { isFilterBarSticky } = this.state

    return (
      <div className="tasks-container">
        <div className="tasks-container-title">
          <h1>{projectTitle}</h1>
          <p>{projectDescription}</p>
        </div>

        <FilterBar isSticky={isFilterBarSticky} />

        <div className={`tasks-list ${isFilterBarSticky ? 'sticky' : ''}`}>
          {
            tasks !== undefined && tasks.map((task, idx) => (
              <Task key={idx} task={task} />
            ))
          }
          {
            tasks !== undefined && tasks.map((task, idx) => (
              <Task key={idx} task={task} />
            ))
          }
          {
            tasks !== undefined && tasks.map((task, idx) => (
              <Task key={idx} task={task} />
            ))
          }
          {
            tasks !== undefined && tasks.map((task, idx) => (
              <Task key={idx} task={task} />
            ))
          }
          {
            tasks !== undefined && tasks.map((task, idx) => (
              <Task key={idx} task={task} />
            ))
          }
          {
            tasks !== undefined && tasks.map((task, idx) => (
              <Task key={idx} task={task} />
            ))
          }
          {
            tasks !== undefined && tasks.map((task, idx) => (
              <Task key={idx} task={task} />
            ))
          }
          {
            tasks !== undefined && tasks.map((task, idx) => (
              <Task key={idx} task={task} />
            ))
          }

          {projectTitle !== undefined && <AddTask />}
        </div>
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
