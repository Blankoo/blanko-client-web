import React, { Component, useDebugValue } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchTasks,
    getSingleProject,
    fetchAccumulatedProjectTime
} from '../../actions'

// Components
import TaskList from './TaskList'
import FilterBar from '../FilterBar'
import Retainer from '../Retainer'
import SadFace from '../../assets/sad-face'

// Styles
import './TasksContainer.scss'

class TasksContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFilterBarSticky: false,
            searchQuery: '',
            filterStatus: 'TODO'
        }

        this.filterBar = React.createRef()
        this.tasksContainerTitle = React.createRef()
        this.tasksContainer = React.createRef()
    }

    componentDidMount() {
        console.log('task container mounted...')
        window.addEventListener('scroll', this.handleScroll)
        const { projectId } = this.props.urlParams
        this.updateProject(projectId)
    }

    componentDidUpdate(prevProps) {
        if (this.props.urlParams.projectId !== prevProps.urlParams.projectId) {
            const projectId = this.props.urlParams.projectId
            this.updateProject(projectId)
            return true
        }

        return false
    }

    updateProject(projectId) {
        const { getSingleProject, fetchAccumulatedProjectTime } = this.props

        getSingleProject(projectId)
            .then((project) => project._id)
            .then(fetchAccumulatedProjectTime)
            .catch((err) => {
                console.log(err)
            })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleTaskSearch = (searchQuery) => {
        if (searchQuery !== undefined) {
            console.log('search bla bla', { searchQuery })
            this.setState({ searchQuery })
        }
    }

    handleTaskStatusFilter = (e) => {
        const status = e.target.value

        this.setState({
            filterStatus: status
        })
    }

    render() {
        const {
            projectTitle,
            projectDescription,
            activeTask,
            accumulatedTime
        } = this.props

        const { isFilterBarSticky, filterStatus, searchQuery } = this.state

        const isThereAnActiveTask = activeTask !== undefined

        return (
            <div className={`home-container tasks-container ${isThereAnActiveTask ? 'task-active' : ''}`} ref={this.tasksContainer}>
                {
                    projectTitle !== undefined
                        ? <>
                            <div className="tasks-container-title" ref={this.tasksContainerTitle}>
                                <div>
                                    <h1>{projectTitle}</h1>
                                    <p>{projectDescription}</p>
                                </div>

                                <Retainer accumulatedTime={accumulatedTime} />
                            </div>

                            <FilterBar
                                isSticky={isFilterBarSticky}
                                handleTaskSearch={this.handleTaskSearch}
                            />

                            <TaskList
                                label="Todo"
                                isSticky={isFilterBarSticky}
                                searchQuery={searchQuery}
                                filterStatus={filterStatus}
                            />

                            <TaskList
                                label="Done"
                                isSticky={isFilterBarSticky}
                                searchQuery={searchQuery}
                                filterStatus={filterStatus}
                                deleted
                            />

                        </>
                        : <div className="project-not-found">
                            <SadFace />
                            <h4>Project does not exist...</h4>
                        </div>
                }
            </div>
        )
    }
}

TasksContainer.propTypes = {
    projectTitle: PropTypes.string,
    projectDescription: PropTypes.string,
    getSingleProject: PropTypes.func,
    fetchTasks: PropTypes.func,
    activeTask: PropTypes.instanceOf(Object)
}

const mapStateToProps = ({ projectReducer }) => ({
    projectTitle: projectReducer.activeProject.projectTitle,
    projectDescription: projectReducer.activeProject.projectDescription,
    activeTask: projectReducer.activeTask,
    accumulatedTime: projectReducer.accumulatedTime
})

export default connect(mapStateToProps, { fetchTasks, getSingleProject, fetchAccumulatedProjectTime })(TasksContainer)
