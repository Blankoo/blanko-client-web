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
    this.tasksContainerTitle = React.createRef()
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
    const scrollOffset = this.tasksContainerTitle.current.clientHeight
    const outerHeights = 64

    if (window.scrollY < scrollOffset + outerHeights) {
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
    const {
      tasks,
      projectTitle,
      projectDescription,
      activeTask
    } = this.props

    const { isFilterBarSticky } = this.state

    const isThereAnActiveTask = activeTask !== undefined

    return (
      <div className={`tasks-container ${isThereAnActiveTask ? 'task-active' : ''}`}>
        <div className="tasks-container-title" ref={this.tasksContainerTitle}>
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
  fetchTasks: PropTypes.func,
  activeTask: PropTypes.instanceOf(Object)
}

const mapStateToProps = ({ projectReducer }) => ({
  tasks: projectReducer.tasks,
  projectTitle: projectReducer.activeProject.projectTitle,
  projectDescription: projectReducer.activeProject.projectDescription,
  activeTask: projectReducer.activeTask
})

export default connect(mapStateToProps, { fetchTasks, getSingleProject })(TasksContainer)
